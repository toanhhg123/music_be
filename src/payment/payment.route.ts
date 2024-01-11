import Stripe from 'stripe'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import expressAsyncHandler from 'express-async-handler'
import express, { Express } from 'express'
import userService from '~/user/user.service'
import { authorize } from '~/middlewares/auth.middleware'
import path from 'path'

const stripe = new Stripe(
  'sk_test_51OO1FjCs190ReUaqFNPAXpxQZh2f12THnH6uaiX7RwMM5wp42t0XFDom5GaqpOBsuorp6NryZzHdB4ImcAGHF5Bo00mrKTxPOR'
)
const enpoint_secret = 'whsec_UwdjbBnXSEnbjiEDXabeAohYmeNbtOit'

const router = Router()

router.post(
  '/',
  expressAsyncHandler(authorize()),
  expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const paymentIntent = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1OOCXJCs190ReUaqyA0iIu5U',
          quantity: 1
        }
      ],
      metadata: { user: userId },
      payment_intent_data: {
        metadata: { user: userId },
        description: userId
      },
      mode: 'payment',
      currency: 'usd',
      success_url: 'http://14.225.206.52:8080/payment/success',
      cancel_url: 'http://14.225.206.52:8080/payment/cancel'
    })

    res.json({
      status: StatusCodes.OK,
      message: 'success',
      element: paymentIntent.url
    })
  })
)

router.get('/success', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'checkout-success.html'))
})

router.get('/cancel', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'checkout-cancel.html'))
})

export const webHookPayment = (app: Express) => {
  app.post(
    '/payment/web-hook',
    express.raw({ type: 'application/json' }),
    expressAsyncHandler(async (request, response) => {
      console.log('webhook running')
      const sig = request.headers['stripe-signature']

      let event: Stripe.Event

      try {
        event = stripe.webhooks.constructEvent(request.body, sig!, enpoint_secret)
      } catch (err: any) {
        console.log({ err })
        response.status(400).send(`Webhook Error: ${err.message}`)
        return
      }

      switch (event.type) {
        case 'payment_intent.succeeded': {
          const { metadata } = event.data.object
          const user = await userService.updateUser(metadata.user, { isPremium: true })
          console.log(`:::::user ${user[0]} go to premium`)
          break
        }
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send()
    })
  )

  console.log('web hook payment success')
}

export default router
