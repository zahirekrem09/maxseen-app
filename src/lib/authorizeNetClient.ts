import AuthorizeNet from 'authorizenet'

const ApiContracts = AuthorizeNet.APIContracts
const ApiControllers = AuthorizeNet.APIControllers
const SDKConstants = AuthorizeNet.Constants

const apiLoginKey = process.env.ANET_API_LOGIN_ID ?? '5KP3u95bQpv'
const transactionKey = process.env.ANET_API_TRANSACTION_KEY ?? '346HZ32z3fP4hTG2'

export interface IChargeAmount {
  price: string
  cardDetails: {
    cardNumber: string
    expiry: string
    cvc: string
  }
}

export const chargeAmount = async (chargePayload: IChargeAmount) => {
  const { price, cardDetails } = chargePayload
  const { cardNumber, expiry, cvc } = cardDetails

  const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType()
  merchantAuthenticationType.setName(apiLoginKey)
  merchantAuthenticationType.setTransactionKey(transactionKey)

  const creditCard = new ApiContracts.CreditCardType()
  creditCard.setCardNumber(cardNumber)
  creditCard.setExpirationDate(expiry)
  creditCard.setCardCode(cvc)

  const paymentType = new ApiContracts.PaymentType()
  paymentType.setCreditCard(creditCard)

  const transactionSetting1 = new ApiContracts.SettingType()
  transactionSetting1.setSettingName('duplicateWindow')
  transactionSetting1.setSettingValue('120')

  const transactionSettings = new ApiContracts.ArrayOfSetting()

  const transactionRequestType = new ApiContracts.TransactionRequestType()
  transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION)
  transactionRequestType.setPayment(paymentType)
  transactionRequestType.setAmount(price)
  transactionRequestType.setTransactionSettings(transactionSettings)

  const createRequest = new ApiContracts.CreateTransactionRequest()
  createRequest.setMerchantAuthentication(merchantAuthenticationType)
  createRequest.setTransactionRequest(transactionRequestType)

  const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON())
  //Defaults to sandbox
  const isProd = process.env.NODE_ENV === 'production'
  isProd && ctrl.setEnvironment(SDKConstants.endpoint.production)
  const chargeAmountPromise = new Promise((resolve, reject) => {
    ctrl.execute(function () {
      let apiResponse = ctrl.getResponse()

      let response = new ApiContracts.CreateTransactionResponse(apiResponse)
      response
      let errorMessage
      if (response != null) {
        if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
          if (response.getTransactionResponse().getMessages() != null) {
            resolve({
              data: response,
              statusCode: 200,
              error: null,
              status: true,
            })
          } else {
            if (response.getTransactionResponse().getErrors() != null) {
              errorMessage = response
                .getTransactionResponse()
                .getErrors()
                .getError()[0]
                .getErrorText()
              reject({ error: errorMessage, statusCode: 400, status: false, data: null })
            }
          }
        } else {
          if (
            response.getTransactionResponse() != null &&
            response.getTransactionResponse().getErrors() != null
          ) {
            errorMessage = response
              .getTransactionResponse()
              .getErrors()
              .getError()[0]
              .getErrorText()
            reject({ error: errorMessage, statusCode: 400, status: false, data: null })
          }
        }
      } else {
        reject({
          error: 'unable to process the payemnt',
          statusCode: 424,
          status: false,
          data: null,
        })
      }
    })
  })
  try {
    return await chargeAmountPromise
  } catch (error) {
    console.log(error)
    return error
  }
}

// export async function authorizeCreditCard() {
//   const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType()
//   merchantAuthenticationType.setName(apiLoginKey)
//   merchantAuthenticationType.setTransactionKey(transactionKey)

//   const creditCard = new ApiContracts.CreditCardType()
//   creditCard.setCardNumber('4242424242424242')
//   creditCard.setExpirationDate('0825')
//   creditCard.setCardCode('999')

//   const paymentType = new ApiContracts.PaymentType()
//   paymentType.setCreditCard(creditCard)

//   const orderDetails = new ApiContracts.OrderType()
//   orderDetails.setInvoiceNumber('INV-12345')
//   orderDetails.setDescription('Product Description')

//   const tax = new ApiContracts.ExtendedAmountType()
//   tax.setAmount('4.26')
//   tax.setName('level2 tax name')
//   tax.setDescription('level2 tax')

//   const duty = new ApiContracts.ExtendedAmountType()
//   duty.setAmount('8.55')
//   duty.setName('duty name')
//   duty.setDescription('duty description')

//   const shipping = new ApiContracts.ExtendedAmountType()
//   shipping.setAmount('8.55')
//   shipping.setName('shipping name')
//   shipping.setDescription('shipping description')

//   const billTo = new ApiContracts.CustomerAddressType()
//   billTo.setFirstName('Ellen')
//   billTo.setLastName('Johnson')
//   billTo.setCompany('Souveniropolis')
//   billTo.setAddress('14 Main Street')
//   billTo.setCity('Pecan Springs')
//   billTo.setState('TX')
//   billTo.setZip('44628')
//   billTo.setCountry('USA')

//   const shipTo = new ApiContracts.CustomerAddressType()
//   shipTo.setFirstName('China')
//   shipTo.setLastName('Bayles')
//   shipTo.setCompany('Thyme for Tea')
//   shipTo.setAddress('12 Main Street')
//   shipTo.setCity('Pecan Springs')
//   shipTo.setState('TX')
//   shipTo.setZip('44628')
//   shipTo.setCountry('USA')

//   const lineItem_id1 = new ApiContracts.LineItemType()
//   lineItem_id1.setItemId('1')
//   lineItem_id1.setName('vase')
//   lineItem_id1.setDescription('cannes logo')
//   lineItem_id1.setQuantity('18')
//   lineItem_id1.setUnitPrice(45.0)

//   const lineItem_id2 = new ApiContracts.LineItemType()
//   lineItem_id2.setItemId('2')
//   lineItem_id2.setName('vase2')
//   lineItem_id2.setDescription('cannes logo2')
//   lineItem_id2.setQuantity('28')
//   lineItem_id2.setUnitPrice('25.00')

//   const lineItemList = []
//   lineItemList.push(lineItem_id1)
//   lineItemList.push(lineItem_id2)

//   const lineItems = new ApiContracts.ArrayOfLineItem()
//   lineItems.setLineItem(lineItemList)

//   const userField_a = new ApiContracts.UserField()
//   userField_a.setName('A')
//   userField_a.setValue('Aval')

//   const userField_b = new ApiContracts.UserField()
//   userField_b.setName('B')
//   userField_b.setValue('Bval')

//   const userFieldList = []
//   userFieldList.push(userField_a)
//   userFieldList.push(userField_b)

//   var userFields = new ApiContracts.TransactionRequestType.UserFields()
//   userFields.setUserField(userFieldList)

//   var transactionSetting1 = new ApiContracts.SettingType()
//   transactionSetting1.setSettingName('duplicateWindow')
//   transactionSetting1.setSettingValue('120')

//   var transactionSetting2 = new ApiContracts.SettingType()
//   transactionSetting2.setSettingName('recurringBilling')
//   transactionSetting2.setSettingValue('false')

//   var transactionSettingList = []
//   transactionSettingList.push(transactionSetting1)
//   transactionSettingList.push(transactionSetting2)

//   var transactionSettings = new ApiContracts.ArrayOfSetting()
//   transactionSettings.setSetting(transactionSettingList)

//   var transactionRequestType = new ApiContracts.TransactionRequestType()
//   transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION)
//   transactionRequestType.setPayment(paymentType)
//   transactionRequestType.setAmount(getRandomAmount())
//   transactionRequestType.setLineItems(lineItems)
//   transactionRequestType.setUserFields(userFields)
//   transactionRequestType.setOrder(orderDetails)
//   transactionRequestType.setTax(tax)
//   transactionRequestType.setDuty(duty)
//   transactionRequestType.setShipping(shipping)
//   transactionRequestType.setBillTo(billTo)
//   transactionRequestType.setShipTo(shipTo)
//   transactionRequestType.setTransactionSettings(transactionSettings)

//   var createRequest = new ApiContracts.CreateTransactionRequest()
//   createRequest.setMerchantAuthentication(merchantAuthenticationType)
//   createRequest.setTransactionRequest(transactionRequestType)

//   //pretty print request
//   // console.log(JSON.stringify(createRequest.getJSON(), null, 2))

//   var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON())

//   //  'authCode' => $tresponse->getAuthCode(),

//   await ctrl.execute(async function () {
//     var apiResponse = await ctrl.getResponse()

//     var response = await new ApiContracts.CreateTransactionResponse(apiResponse)

//     //pretty print response
//     // console.log(JSON.stringify(response, null, 2))

//     if (response != null) {
//       if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
//         if (response.getTransactionResponse().getMessages() != null) {
//           // console.log(
//           //   'Successfully created transaction with Transaction ID: ' +
//           //     response.getTransactionResponse().getTransId(),
//           // )
//           // console.log('Response Code: ' + response.getTransactionResponse().getResponseCode())
//           // console.log(
//           //   'Message Code: ' +
//           //     response.getTransactionResponse().getMessages().getMessage()[0].getCode(),
//           // )
//           // console.log(
//           //   'Description: ' +
//           //     response.getTransactionResponse().getMessages().getMessage()[0].getDescription(),
//           // )

//           setAResponse({
//             succes: true,
//             message: response
//               .getTransactionResponse()
//               .getMessages()
//               .getMessage()[0]
//               .getDescription(),
//             transId: response.getTransactionResponse().getTransId(),
//           })
//           console.log('aResponse-1', aResponse)
//         } else {
//           if (response.getTransactionResponse().getErrors() != null) {
//             // console.log(
//             //   'Error Code: ' +
//             //     response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
//             // )
//             // console.log(
//             //   'Error message: ' +
//             //     response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
//             // )
//             aResponse = {
//               succes: false,
//               transId: null,
//               message: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
//             }
//           }
//         }
//       } else {
//         if (
//           response.getTransactionResponse() != null &&
//           response.getTransactionResponse().getErrors() != null
//         ) {
//           // console.log(
//           //   'Error Code: ' +
//           //     response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
//           // )
//           // console.log(
//           //   'Error message: ' +
//           //     response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
//           // )

//           aResponse = {
//             succes: false,
//             transId: null,
//             message: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
//           }
//         } else {
//           // console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode())
//           // console.log('Error message: ' + response.getMessages().getMessage()[0].getText())
//           aResponse = {
//             succes: false,
//             transId: null,
//             message: response.getMessages().getMessage()[0].getText(),
//           }
//         }
//       }
//     } else {
//       aResponse = {
//         succes: false,
//         transId: null,
//         message: 'Null Response',
//       }
//     }
//   })
// }
