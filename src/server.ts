import express from "express"
import { Request, Response } from "express"
import stripe from "./services/stripe"
const app = express()
const port = 3000


app.post("/create-customer", async (req, res) => {
    const customer = await stripe.customers.create({
        description: 'Ditin User',
    }).then((customer) => {
        res.send((customer))
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})