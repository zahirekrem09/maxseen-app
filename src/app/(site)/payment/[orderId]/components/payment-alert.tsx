'use client'
import { useConfettiContext } from '@/components/providers/Confetti'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect } from 'react'

const PaymentAlert = ({ transId }: { transId: string }) => {
  const confettiCtx = useConfettiContext()
  useEffect(() => {
    confettiCtx.showConfetti()
  }, [confettiCtx])
  return (
    <Card>
      <CardContent>
        <div className="bg-white p-6  md:mx-auto">
          <svg viewBox="0 0 24 24" className="mx-auto my-6 h-16 w-16 text-green-600">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
              Payment Done!
            </h3>
            <p className="my-2 text-gray-600">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <p>transId : {transId}</p>
            <div className="py-10 text-center">
              <a
                href="https://maxseen.com/"
                referrerPolicy="origin"
                className={buttonVariants({ variant: 'primary' })}
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentAlert
