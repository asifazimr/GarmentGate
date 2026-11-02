import { createElement } from 'react';
import { render } from 'react-email';
import { KycDecision, type KycDecisionProps } from './templates/kyc-decision.js';
import { NotificationEmail, type NotificationEmailProps } from './templates/notification.js';
import { ResetPassword, type ResetPasswordProps } from './templates/reset-password.js';
import { VerifyEmail, type VerifyEmailProps } from './templates/verify-email.js';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/** Every email the platform sends, keyed by template name. */
export interface EmailTemplates {
  'verify-email': VerifyEmailProps;
  'reset-password': ResetPasswordProps;
  'kyc-decision': KycDecisionProps;
  notification: NotificationEmailProps;
}
export type EmailTemplateName = keyof EmailTemplates;

const subjects: { [K in EmailTemplateName]: (props: EmailTemplates[K]) => string } = {
  'verify-email': () => 'Confirm your email for GarmentGate',
  'reset-password': () => 'Reset your GarmentGate password',
  'kyc-decision': (p) =>
    p.approved ? 'Your company is verified on GarmentGate' : 'Action needed: verification update',
  notification: (p) => p.title,
};

export async function renderEmail<K extends EmailTemplateName>(
  name: K,
  props: EmailTemplates[K],
): Promise<RenderedEmail> {
  const element = elementFor(name, props);
  const [html, text] = await Promise.all([render(element), render(element, { plainText: true })]);
  return { subject: subjects[name](props), html, text };
}

function elementFor<K extends EmailTemplateName>(name: K, props: EmailTemplates[K]) {
  switch (name) {
    case 'verify-email':
      return createElement(VerifyEmail, props as VerifyEmailProps);
    case 'reset-password':
      return createElement(ResetPassword, props as ResetPasswordProps);
    case 'kyc-decision':
      return createElement(KycDecision, props as KycDecisionProps);
    case 'notification':
      return createElement(NotificationEmail, props as NotificationEmailProps);
    default:
      throw new Error(`Unknown email template: ${String(name)}`);
  }
}

export type { KycDecisionProps, NotificationEmailProps, ResetPasswordProps, VerifyEmailProps };
