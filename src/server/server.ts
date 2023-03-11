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
    const paymentIntent = await stripe.paymentIntents.create({
        currency:"brl",
        amount: 2000,
        payment_method_types: ["card"]
    })
    res.json({ clientSecret: paymentIntent.client_secret })

})

app.get("/config", async (req, res) => {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
})

app.listen(port, () => {
    console.log(`Backend http://localhost:${port}`)
})