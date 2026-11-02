import { expect, type Page, test } from '@playwright/test';
import { PASSWORD, USERS } from './env';

/**
 * The four journeys the product is built around (CLAUDE.md → UX principles), driven like a
 * person would: from the dashboard, by visible labels. Each also counts the clicks it takes.
 */

async function signIn(page: Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Work email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL((url) => !url.pathname.startsWith('/login'));
}

/** Clicks that move the journey forward (form typing doesn't count). */
function clicks() {
  let n = 0;
  return {
    click: async (locator: ReturnType<Page['getByRole']>) => {
      n += 1;
      await locator.click();
    },
    get count() {
      return n;
    },
  };
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

test.describe.configure({ mode: 'serial' });

test('1 · a buyer posts an RFQ', async ({ page }) => {
  await signIn(page, USERS.buyer);
  const c = clicks();
  await c.click(page.getByRole('link', { name: 'Request a quote' }).first());
  await expect(page.getByRole('heading', { name: 'New request for quote' })).toBeVisible();

  // Phones tap (the touch profile doesn't open selects with an emulated mouse click).
  await page.getByRole('combobox', { name: 'Category' }).tap();
  await page.getByRole('option', { name: 'T-shirts' }).tap();
  await page.getByLabel('Title').fill('Garment-dyed heavyweight tee, 240 GSM');
  await page
    .getByLabel('Description')
    .fill('Boxy fit, 1x1 rib neck, double-needle hems. Four colours, sizes S–XXL, polybagged.');
  await c.click(page.getByRole('button', { name: 'Continue' }));

  await page.getByLabel('Quantity (pcs)').fill('1500');
  await page.getByLabel('Quotes needed by').fill(daysFromNow(14));
  await c.click(page.getByRole('button', { name: 'Continue' }));

  await c.click(page.getByRole('button', { name: 'Publish' }));
  await expect(page).toHaveURL(/\/buyer\/rfqs\/RFQ-\d{4}-\d{5}$/);
  await expect(page.getByText('Garment-dyed heavyweight tee, 240 GSM').first()).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(4);
});

test('2 · a buyer accepts a quote and pays the deposit', async ({ page }) => {
  await signIn(page, USERS.buyerWithOffers);
  const c = clicks();
  await c.click(page.getByRole('link', { name: /RFQ-2026-00042/ }).first());
  await c.click(page.getByRole('button', { name: 'Accept offer' }).first());
  await c.click(page.getByRole('button', { name: 'Accept and create order' }));
  await c.click(page.getByRole('button', { name: 'Confirm and pay the deposit' }));

  await expect(page).toHaveURL(/\/buyer\/orders\/ORD-\d{4}-\d{5}/);
  const dialog = page.getByRole('dialog', { name: 'Pay the deposit' });
  await expect(dialog.getByText('Quote this reference')).toBeVisible();
  await c.click(dialog.getByRole('button', { name: 'I’ve sent it' }));
  await expect(page.getByText('Thanks: we’ll confirm it when it arrives.')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(5);
});

test('3 · a factory submits a quote', async ({ page }) => {
  await signIn(page, USERS.factory);
  const c = clicks();
  // The RFQ from journey 1 matched this factory (T-shirts): it's on the dashboard.
  await c.click(page.getByRole('link', { name: /Garment-dyed heavyweight tee/ }).first());
  await page.getByLabel(/Your price \/ pc/).fill('3.85');
  await page.getByLabel('Lead time (days)').fill('45');
  await c.click(page.getByRole('button', { name: 'Send quote' }));
  await expect(page.getByText('Quote sent')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(2);
});

test('4 · a factory updates a production milestone', async ({ page }) => {
  await signIn(page, USERS.factory);
  const c = clicks();
  await c.click(page.getByRole('link', { name: /Heavyweight boxy tee/ }).first());
  await expect(page).toHaveURL(/\/manufacturer\/orders\/ORD-2026-00017/);
  await c.click(page.getByRole('button', { name: 'Mark complete' }).first());
  await expect(page.getByText('Stage completed')).toBeVisible();
  expect(c.count).toBeLessThanOrEqual(2);
});
