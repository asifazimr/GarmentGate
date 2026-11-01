import {
  EmailButton,
  EmailHeading,
  EmailLayout,
  EmailText,
  FallbackLink,
} from '../components/layout.js';

export interface ResetPasswordProps {
  firstName: string;
  resetUrl: string;
  expiresInMinutes: number;
}

export function ResetPassword({ firstName, resetUrl, expiresInMinutes }: ResetPasswordProps) {
  return (
    <EmailLayout preview="Reset your GarmentGate password">
      <EmailHeading>Reset your password</EmailHeading>
      <EmailText>Hi {firstName}, we received a request to reset your password.</EmailText>
      <EmailButton href={resetUrl}>Choose a new password</EmailButton>
      <EmailText>
        This link expires in {expiresInMinutes} minutes and can be used once. Resetting your
        password signs you out on all devices.
      </EmailText>
      <EmailText>
        If you didn’t ask for this, you can ignore this email. Your password won’t change.
      </EmailText>
      <FallbackLink href={resetUrl} />
    </EmailLayout>
  );
}

ResetPassword.PreviewProps = {
  firstName: 'Jordan',
  resetUrl: 'http://localhost:3000/reset-password?token=preview-token-0123456789',
  expiresInMinutes: 60,
} satisfies ResetPasswordProps;

export default ResetPassword;
