import { describe, expect, it } from 'vitest';
import { OrderStatusSchema } from '../status/statuses.js';
import {
  allowedTransitions,
  canTransition,
  flowProgress,
  isTerminal,
  nextStep,
  ORDER_FLOW,
  ORDER_TRANSITIONS,
} from './order-state.js';

describe('order state machine', () => {
  it('covers every status', () => {
    expect(Object.keys(ORDER_TRANSITIONS).sort()).toEqual([...OrderStatusSchema.options].sort());
  });

  it('allows the happy path end to end, each step by someone', () => {
    for (let i = 0; i < ORDER_FLOW.length - 1; i += 1) {
      const from = ORDER_FLOW[i];
      const to = ORDER_FLOW[i + 1];
      if (!from || !to) continue;
      expect(canTransition(from, to, 'ADMIN'), `${from} → ${to}`).toBe(true);
    }
  });

  it('refuses skipping ahead or going backwards', () => {
    expect(canTransition('DRAFT', 'IN_PRODUCTION', 'ADMIN')).toBe(false);
    expect(canTransition('SAMPLING', 'IN_PRODUCTION', 'ADMIN')).toBe(false);
    expect(canTransition('IN_PRODUCTION', 'SHIPPED', 'MANUFACTURER')).toBe(false);
    expect(canTransition('SHIPPED', 'IN_PRODUCTION', 'ADMIN')).toBe(false);
    expect(canTransition('DELIVERED', 'SHIPPED', 'ADMIN')).toBe(false);
  });

  it('lets sampling be skipped, and repeated after approval', () => {
    expect(canTransition('DRAFT', 'DEPOSIT_PENDING', 'BUYER')).toBe(true);
    expect(canTransition('SAMPLE_APPROVED', 'SAMPLING', 'BUYER')).toBe(true);
  });

  it('keeps money and quality decisions with GarmentGate', () => {
    expect(canTransition('DEPOSIT_PENDING', 'IN_PRODUCTION', 'BUYER')).toBe(false);
    expect(canTransition('DEPOSIT_PENDING', 'IN_PRODUCTION', 'MANUFACTURER')).toBe(false);
    expect(canTransition('DEPOSIT_PENDING', 'IN_PRODUCTION', 'ADMIN')).toBe(true);
    expect(canTransition('QC', 'READY_TO_SHIP', 'MANUFACTURER')).toBe(false);
    expect(canTransition('QC', 'IN_PRODUCTION', 'ADMIN')).toBe(true); // rework
    expect(canTransition('QC', 'IN_PRODUCTION', 'MANUFACTURER')).toBe(false);
  });

  it('gives each party only its own moves', () => {
    expect(allowedTransitions('IN_PRODUCTION', 'MANUFACTURER')).toEqual(['QC']);
    expect(allowedTransitions('IN_PRODUCTION', 'BUYER')).toEqual(['DISPUTED']);
    // Nobody ships by hand: the order ships when GarmentGate's shipment departs.
    expect(allowedTransitions('READY_TO_SHIP', 'MANUFACTURER')).toEqual([]);
    expect(allowedTransitions('READY_TO_SHIP', 'ADMIN')).toEqual(['DISPUTED']);
    expect(canTransition('READY_TO_SHIP', 'SHIPPED', 'ADMIN')).toBe(true);
    expect(allowedTransitions('SHIPPED', 'BUYER')).toEqual(['DELIVERED', 'DISPUTED']);
    expect(allowedTransitions('SHIPPED', 'MANUFACTURER')).toEqual([]);
  });

  it('lets buyers cancel only before production', () => {
    for (const status of ['DRAFT', 'SAMPLING', 'SAMPLE_APPROVED', 'DEPOSIT_PENDING'] as const) {
      expect(canTransition(status, 'CANCELLED', 'BUYER')).toBe(true);
    }
    expect(canTransition('IN_PRODUCTION', 'CANCELLED', 'BUYER')).toBe(false);
    expect(canTransition('IN_PRODUCTION', 'CANCELLED', 'ADMIN')).toBe(true);
  });

  it('resolves disputes only through staff', () => {
    expect(allowedTransitions('DISPUTED', 'BUYER')).toEqual([]);
    expect(allowedTransitions('DISPUTED', 'ADMIN')).toContain('COMPLETED');
  });

  it('ends at COMPLETED and CANCELLED', () => {
    expect(isTerminal('COMPLETED')).toBe(true);
    expect(isTerminal('CANCELLED')).toBe(true);
    expect(isTerminal('SHIPPED')).toBe(false);
  });

  it('reports progress and whose move it is', () => {
    expect(flowProgress('DRAFT')).toBe(0);
    expect(flowProgress('COMPLETED')).toBe(100);
    expect(nextStep('SAMPLING', { latestSample: { status: 'REQUESTED' } })).toEqual({
      step: 'FACTORY_SHIPS_SAMPLE',
      owner: 'MANUFACTURER',
    });
    expect(nextStep('SAMPLING', { latestSample: { status: 'SHIPPED' } })).toEqual({
      step: 'REVIEW_SAMPLE',
      owner: 'BUYER',
    });
    expect(nextStep('QC').owner).toBe('ADMIN');
    expect(nextStep('COMPLETED').owner).toBeNull();
  });

  it('hands a failed final inspection to the buyer, and asks for the balance before shipping', () => {
    expect(nextStep('QC', { finalInspection: 'FAIL' })).toEqual({
      step: 'QC_FAILED',
      owner: 'BUYER',
    });
    expect(nextStep('QC', { finalInspection: 'PENDING' }).step).toBe('INSPECTION');
    expect(nextStep('READY_TO_SHIP', { balancePaid: false })).toEqual({
      step: 'PAY_BALANCE',
      owner: 'BUYER',
    });
    expect(nextStep('READY_TO_SHIP', { balancePaid: true }).step).toBe('SHIP');
    // The factory can't book the pickup until the buyer has chosen how it ships.
    expect(nextStep('READY_TO_SHIP', { balancePaid: false, shippingChosen: false })).toEqual({
      step: 'CHOOSE_SHIPPING',
      owner: 'BUYER',
    });
  });
});
