import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'
import * as React from 'react'

interface DropboxResetPasswordEmailProps {
  userFirstname?: string
  resetPasswordLink?: string
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

export const ResetPasswordEmail = ({
  userFirstname = 'Zeno',
  resetPasswordLink = 'https://maxseen.com',
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Maxseen reset your password</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={`https://maxseen.com/wp-content/uploads/2023/06/logo.webp`}
              width="150"
              height="45"
              alt="Logo"
            />
            <Section>
              <Text style={text}>Hi {userFirstname},</Text>
              <Text style={text}>
                Someone recently requested a password change for your Maxseen account. If this was
                you, you can set a new password here:
              </Text>
              <Button
                pX={20}
                pY={12}
                className="inline-flex items-center justify-center rounded-md bg-violet-800 text-sm font-medium text-zinc-100 transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t request this, just
                ignore and delete this message.
              </Text>

              <Text style={{ ...text, marginBottom: '14px' }}>
                Or, copy and paste this temporary login code:
              </Text>
              <code style={code}>{resetPasswordLink}</code>
              {/* <Text style={text}>
              To keep your account secure, please don&apos;t forward this email to anyone. See our
              Help Center for{' '}
              <Link style={anchor} href="https://dropbox.com">
                more security tips.
              </Link>
            </Text> */}
              {/* <Text style={text}>Happy Dropboxing!</Text> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ResetPasswordEmail

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#6923f0',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
}

const anchor = {
  textDecoration: 'underline',
}
const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}
