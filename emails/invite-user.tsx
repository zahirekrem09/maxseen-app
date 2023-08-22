import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface InviteUserEmailProps {
  userEmail?: string
  invitedByName?: string
  invitedByEmail?: string
  inviteLink?: string
}

export const MaxseenInviteUserEmail = ({
  userEmail = 'zenorocha@email.com',
  invitedByName = 'Ekrem SARI',
  invitedByEmail = 'ekrem@example.com',
  inviteLink = 'https://vercel.com/teams/invite/foo',
}: InviteUserEmailProps) => {
  const previewText = `Pay ${invitedByName} on Maxseen`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://maxseen.com/wp-content/uploads/2023/06/logo.webp`}
                width="150"
                height="45"
                alt="maxseen Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Pay <strong>{invitedByName}</strong> on <strong>Maxseen</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {userEmail},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByName}</strong> (
              <Link href={`mailto:${invitedByEmail}`} className="text-violet-600 no-underline">
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{invitedByName}</strong> payment url on{' '}
              <strong>Maxseen</strong>.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-violet-600 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Payment Now
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-violet-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for <span className="text-black">{userEmail} </span>.This
              invite was sent from{' '}
              <Link href={inviteLink} className="text-violet-600 no-underline">
                {inviteLink}
              </Link>{' '}
              . If you were not expecting this invitation, you can ignore this email. If you are
              concerned about your account &rsquos safety, please reply to this email to get in
              touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default MaxseenInviteUserEmail
