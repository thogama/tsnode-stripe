import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
function Card() {
    const elements = useElements()
    const stripe = useStripe()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const { clientSecret } = await fetch("http://localhost:3000/create-payment-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodType: "card",
                currency: "brl",
            }),
        }).then(res => res.json())

        await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,

            }
        })
    }
    return (
        <>
            <h1>Card</h1>
            <form onSubmit={(e) => handleSubmit(e)} id="payment-form">
                <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                <button type="submit">Pay</button>
            </form>
        </>
    );
}

export default Card