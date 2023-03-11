import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row"
function PayCard() {
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
        <Container style={{ padding: "3rem" }}>
            <Row className="justify-content-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card</Card.Title>
                        <Card.Text>
                            <h1></h1>
                            <form onSubmit={(e) => handleSubmit(e)} id="payment-form">
                                <CardElement id="card-element" />
                                <Button style={{ marginTop: "1rem" }} type="submit">Pay</Button>

                            </form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

        </Container>

    );

}

export default PayCard