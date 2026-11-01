import {
  EmailButton,
  EmailHeading,
  EmailLayout,
  EmailText,
  FallbackLink,
} from '../components/layout.js';

export interface VerifyEmailProps {
  firstName: string;
  verifyUrl: string;
  expiresInHours: number;
}

export function VerifyEmail({ firstName, verifyUrl, expiresInHours }: VerifyEmailProps) {
  return (
    <EmailLayout preview="Confirm your email to finish setting up GarmentGate">
      <EmailHeading>Confirm your email</EmailHeading>
      <EmailText>Hi {firstName}, welcome to GarmentGate.</EmailText>
      <EmailText>
        Please confirm this is your email address. You’ll need a verified email to submit your
        company for verification.
      </EmailText>
      <EmailButton href={verifyUrl}>Confirm email</EmailButton>
      <EmailText>This link expires in {expiresInHours} hours.</EmailText>
      <FallbackLink href={verifyUrl} />
    </EmailLayout>
  );
}

VerifyEmail.PreviewProps = {
  firstName: 'Lena',
  verifyUrl: 'http://localhost:3000/verify-email?token=preview-token-0123456789',
  expiresInHours: 24,
} satisfies VerifyEmailProps;

export default VerifyEmail;
