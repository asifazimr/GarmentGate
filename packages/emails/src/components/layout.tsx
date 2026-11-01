import type { ReactNode } from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';

const colors = {
  ink: '#0f172a',
  muted: '#475569',
  border: '#e2e8f0',
  brand: '#0f766e',
  surface: '#f8fafc',
};

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.surface,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          margin: 0,
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            maxWidth: 520,
            padding: '32px 28px',
          }}
        >
          <Text style={{ color: colors.brand, fontSize: 18, fontWeight: 700, margin: '0 0 24px' }}>
            GarmentGate
          </Text>
          {children}
          <Hr style={{ borderColor: colors.border, margin: '32px 0 16px' }} />
          <Text style={{ color: colors.muted, fontSize: 12, lineHeight: '18px', margin: 0 }}>
            GarmentGate · Managed garment sourcing. You received this email because of activity on
            your GarmentGate account. If this wasn’t you, you can ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <Heading
      as="h1"
      style={{ color: colors.ink, fontSize: 22, lineHeight: '30px', margin: '0 0 12px' }}
    >
      {children}
    </Heading>
  );
}

export function EmailText({ children }: { children: ReactNode }) {
  return (
    <Text style={{ color: colors.muted, fontSize: 15, lineHeight: '24px', margin: '0 0 16px' }}>
      {children}
    </Text>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Section style={{ margin: '24px 0' }}>
      <Button
        href={href}
        style={{
          backgroundColor: colors.brand,
          borderRadius: 8,
          color: '#ffffff',
          display: 'inline-block',
          fontSize: 15,
          fontWeight: 600,
          padding: '12px 20px',
          textDecoration: 'none',
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

export function FallbackLink({ href }: { href: string }) {
  return (
    <Text style={{ color: colors.muted, fontSize: 13, lineHeight: '20px', wordBreak: 'break-all' }}>
      Button not working? Paste this link into your browser:
      <br />
      {href}
    </Text>
  );
}
