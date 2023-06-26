const asyncHandler = require("express-async-handler");
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const DOMAIN = 'http://localhost:3000'

const makeOrder = asyncHandler(async (req, res) => {
    try {

        const { items } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price) * 100,
                    },
                    quantity: item.quantity
                }
            }),
            invoice_creation: {
                enabled: true,
            },
            phone_number_collection: {
                enabled: true,
            },
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            success_url: `${DOMAIN}/success`,
            cancel_url: `${DOMAIN}/failure`
        })
        res.json({ url: session.url, session: session })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const getOrderDetails = asyncHandler(async (req, res) => {
    const { session_id } = req.body;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // const lineItems = await stripe.checkout.sessions.listLineItems(session_id);
    if (session) {
        const invoice = await stripe.invoices.retrieve(session.invoice)

        if (invoice) {
            res.json({
                session,
                invoice
            })
        }
        else {
            res.json(session)
        }
    }
})

module.exports = {
    makeOrder,
    getOrderDetails
}