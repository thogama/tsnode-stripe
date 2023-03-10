import express from "express"
import stripe from "./services/stripe"
import cors from "cors"
const app = express()
const port = 3000

app.use(cors())
app.post("/create-customer", async (req, res) => {
    const customer = await stripe.customers.create({
        description: 'Ditin User',
    }).then((customer) => {
        res.send((customer))
    });
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "brl",
            amount: 2000,
            automatic_payment_methods: {
                enabled: true,
            }
        })
        res.send({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
        return res.status(400).send({ e })
    }
})

app.listen(port, () => {
    console.log(`Backend http://localhost:${port}`)
})