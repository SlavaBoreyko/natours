/* eslint-disable */
import axios from 'axios';
const stripe = Stripe('pk_test_51JH0cHJhsrpSfP1Pso8J699kJA9BOPilC4dBIGtQ3r1DZP9JNJu53i9OG73TJQoWsXTOYaoAKWSGP2BcBI9L1FvV00ujROgPUe');

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
        );
        console.log(session)

        // 2) Create checkout form 
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch(err) {
            alert(err)
    }
};