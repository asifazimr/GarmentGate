import { EmailButton, EmailHeading, EmailLayout, EmailText } from '../components/layout.js';

export interface KycDecisionProps {
  firstName: string;
  approved: boolean;
  /** Shown when rejected: what to fix. */
  reason?: string;
  actionUrl: string;
}

export function KycDecision({ firstName, approved, reason, actionUrl }: KycDecisionProps) {
  return approved ? (
    <EmailLayout preview="Your company is verified on GarmentGate">
      <EmailHeading>You’re verified 🎉</EmailHeading>
      <EmailText>
        Hi {firstName}, our team has reviewed your documents and your company is now verified. Your
        dashboard is ready.
      </EmailText>
      <EmailButton href={actionUrl}>Go to your dashboard</EmailButton>
    </EmailLayout>
  ) : (
    <EmailLayout preview="We need a few changes before we can verify your company">
      <EmailHeading>A few changes needed</EmailHeading>
      <EmailText>
        Hi {firstName}, thanks for submitting your company. We couldn’t complete verification yet.
      </EmailText>
      {reason ? <EmailText>What to fix: {reason}</EmailText> : null}
      <EmailButton href={actionUrl}>Update your details</EmailButton>
    </EmailLayout>
  );
}

KycDecision.PreviewProps = {
  firstName: 'Emre',
  approved: false,
  reason: 'The business license is cropped; please upload all pages.',
  actionUrl: 'http://localhost:3000/onboarding',
} satisfies KycDecisionProps;

export default KycDecision;
