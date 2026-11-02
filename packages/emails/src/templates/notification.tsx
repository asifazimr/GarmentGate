import { EmailButton, EmailHeading, EmailLayout, EmailText } from '../components/layout.js';

/**
 * Any platform event worth an email (new quote, message, milestone, payment, QC result…).
 * The text is written per audience by the API, so it only ever carries public codes.
 */
export interface NotificationEmailProps {
  firstName: string;
  title: string;
  body: string;
  actionUrl: string;
  actionLabel: string;
  preferencesUrl: string;
}

export function NotificationEmail({
  firstName,
  title,
  body,
  actionUrl,
  actionLabel,
  preferencesUrl,
}: NotificationEmailProps) {
  return (
    <EmailLayout preview={title}>
      <EmailHeading>{title}</EmailHeading>
      <EmailText>Hi {firstName},</EmailText>
      <EmailText>{body}</EmailText>
      <EmailButton href={actionUrl}>{actionLabel}</EmailButton>
      <EmailText>
        You get this email because of your notification settings. Change them any time:{' '}
        {preferencesUrl}
      </EmailText>
    </EmailLayout>
  );
}

NotificationEmail.PreviewProps = {
  firstName: 'Jordan',
  title: 'ORD-2026-00017: final inspection passed',
  body: 'Please pay the balance so the order can ship.',
  actionUrl: 'http://localhost:3000/buyer/orders/ORD-2026-00017',
  actionLabel: 'Open the order',
  preferencesUrl: 'http://localhost:3000/buyer/settings',
} satisfies NotificationEmailProps;

export default NotificationEmail;
