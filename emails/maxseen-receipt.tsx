import { Order, Product } from '@prisma/client'
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import format from 'date-fns/format'
import * as React from 'react'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001'

type MaxseenReceiptEmailProps = {
  order: any
}

export const MaxseenReceiptEmail = ({ order }: MaxseenReceiptEmailProps) => {
  const totalPrice = order.orderItems.reduce((total: any, item: any) => {
    return total + Number(item.product.price?.toNumber())
  }, 0)

  return (
    <Html>
      <Head />
      <Preview>Maxseen Receipt</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column>
              <Img
                src={`https://maxseen.com/wp-content/uploads/2023/06/logo.webp`}
                width="150"
                height="45"
                alt="maxseen Logo"
              />
            </Column>

            <Column align="right" style={tableCell}>
              <Text style={heading}>Receipt</Text>
            </Column>
          </Section>
          {/* <Section>
            <Text style={cupomText}>
              Save 3% on all your Apple purchases with Apple Card.
              <sup style={supStyle}>1</sup>{' '}
              <Link href="https://www.apple.com/apple-card">Apply and use in minutes</Link>
              <sup style={supStyle}>2</sup>
            </Text>
          </Section> */}
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                {/* <Row>
                <Column style={informationTableColumn}>
                  <Text style={informationTableLabel}>APPLE ID</Text>
                  <Link
                    style={{
                      ...informationTableValue,
                      color: '#15c',
                      textDecoration: 'underline',
                    }}
                  >
                    zeno.rocha@gmail.com
                  </Link>
                </Column>
              </Row> */}

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>INVOICE DATE</Text>
                    <Text style={informationTableValue}>
                      {format(order.createdAt, 'MMMM do, yyyy')}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: '#15c',
                        textDecoration: 'underline',
                      }}
                    >
                      {order.id}
                    </Link>
                  </Column>
                  {/* <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>DOCUMENT NO.</Text>
                    <Text style={informationTableValue}>186623754793</Text>
                  </Column> */}
                </Row>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>BILLED TO</Text>
                <Text style={informationTableValue}>Credi Card</Text>
                <Text style={informationTableValue}>{order.name}</Text>
                <Text style={informationTableValue}>{order.address}</Text>
                <Text style={informationTableValue}>
                  {order.state} - {order.city} , {order.zipCode}
                </Text>
                <Text style={informationTableValue}>USA</Text>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Your Services </Text>
          </Section>
          {order.orderItems.map((p: any) => {
            return (
              <Section style={{ marginTop: '10px' }} key={p.id}>
                <Column style={{ width: '64px' }}>
                  <Img
                    src={p.product.image as string}
                    width="64"
                    height="64"
                    alt={p.product.title}
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>{p.product.title}</Text>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>${p.product.price?.toNumber()}</Text>
                </Column>
              </Section>
            )
          })}

          <Hr style={productPriceLine} />
          <Section align="right">
            <Container>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>${totalPrice}</Text>
              </Column>
            </Container>
            <Hr />
            <Container>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>DISCOUNT</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>${order.discount.toNumber()}</Text>
              </Column>
            </Container>
            <Hr />
            <Container>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>SUBTOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>${totalPrice - order.discount.toNumber()}</Text>
              </Column>
            </Container>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Section>
            <Column align="center" style={walletWrapper}>
              <Link href="https://maxseen.com" style={walletLink}>
                <Img
                  src={`https://maxseen.com/wp-content/uploads/2023/06/logo.webp`}
                  width="28"
                  height="28"
                  alt="Apple Wallet"
                  style={walletImage}
                />
                <span style={walletLinkText}>Apply and use in minutes</span>
              </Link>
            </Column>
          </Section>
          <Hr style={walletBottomLine} />
        </Container>
      </Body>
    </Html>
  )
}

export default MaxseenReceiptEmail

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
}

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
}

const tableCell = { display: 'table-cell' }

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
}

const cupomText = {
  textAlign: 'center' as const,
  margin: '36px 0 40px 0',
  fontSize: '14px',
  fontWeight: '500',
  color: '#111111',
}

const supStyle = {
  fontWeight: '300',
}

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
}

const informationTableRow = {
  height: '46px',
}

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
}

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  padding: '5px',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
}

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
}

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText }

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
}

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
}

const divisor = {
  marginLeft: '4px',
  marginRight: '4px',
  color: 'rgb(51,51,51)',
  fontWeight: 200,
}

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
}

const productPrice = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
}

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
}

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
}

const productPriceLine = { margin: '30px 0 0 0' }

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
}

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' }

const productPriceLineBottom = { margin: '0 0 75px 0' }

const block = { display: 'block' }

const ctaTitle = {
  display: 'block',
  margin: '15px 0 0 0',
}

const ctaText = { fontSize: '24px', fontWeight: '500' }

const walletWrapper = { display: 'table-cell', margin: '10px 0 0 0' }

const walletLink = { color: 'rgb(0,126,255)', textDecoration: 'none' }

const walletImage = {
  display: 'inherit',
  paddingRight: '8px',
  verticalAlign: 'middle',
}

const walletBottomLine = { margin: '65px 0 20px 0' }

const footerText = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '0',
  lineHeight: 'auto',
  marginBottom: '16px',
}

const footerTextCenter = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '20px 0',
  lineHeight: 'auto',
  textAlign: 'center' as const,
}

const footerLink = { color: 'rgb(0,115,255)' }

const footerIcon = { display: 'block', margin: '40px 0 0 0' }

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const walletLinkText = {
  fontSize: '14px',
  fontWeight: '400',
  textDecoration: 'none',
}
