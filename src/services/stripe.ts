import Stripe from 'stripe';
import dotenv from "dotenv"
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY!, { apiVersion: '2022-11-15' })
export default stripe