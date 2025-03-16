// import React from 'react'

import { useContext, useState } from "react"
import Layout from "../../Components/LayOut/LayOut.jsx"
import classes from "./payment.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvidere.jsx"
import ProductCard from "../../Components/Product/ProdcutCard.jsx"
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Components/CurrecyFormat/CurrencyFormat.jsx"
import { ClipLoader } from "react-spinners"
import { axiosInstance } from "../../Api/Axios.js"
import { db } from "../../Utility/firebase.js"
import { useNavigate } from "react-router-dom"

const Payment = () => {
    const [error, setError] = useState(null)
    const [process, setProcess] = useState(false)

    const [{ user, basket }, dispatch] = useContext(DataContext)
    // console.log(user)
    const totalItem = basket?.reduce((amount, item) => {
        return item?.amount + amount
    }, 0)

    const total = basket?.reduce((amount, item) => {
        return item?.price * item?.amount + amount
    }, 0)

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const handleChange = (e) => {
        if (e.error) {
            setError(e?.error?.message)
        }
    }


    const handlePayment = async (e) => {
        e.preventDefault()

        try {
            setProcess(true)
            const response = await axiosInstance({
                method: "post",
                url: `/payment/create?total=${total * 100}`
            })
            console.log(response.data)
            const clientSecret = response.data?.clientSecret


            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }
            )

            await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent?.id).set({
                basket: basket,
                amount: paymentIntent?.amount,
                created: paymentIntent?.created
            })

            // empty basket
            dispatch({
                type: "EMPTY_BASKET"
            })

            // console.log(paymentIntent)
            setProcess(false)
            navigate("/orders", { state: { msg: "Order Placed Successfully" } })

        } catch (error) {
            console.log(error)
            setProcess(false)

        }
        // 1. Check if the card element is filled
        // backend || function contact ===> to the client secret

        // 2. client side (react side confirmation)

        // 3. if everything is ok, then confirm the payment
    }

    return (
        <Layout>
            {/* header */}
            <div className={classes.payment__header}>
                Checkout ({totalItem}) items
            </div>
            {/* payment method */}
            <section className={classes.payment}>
                {/* address  */}
                <div className={classes.flex}>
                    <h2>Delivery Address</h2>
                    <div>
                        {user?.email}
                        <div>123 React Lane</div>
                        <div>Chicago, IL</div>
                    </div>
                </div>
                <hr />

                {/* product */}
                <div className={classes.flex}>
                    <h3>Review items and delivery</h3>
                    <div>
                        {basket?.map((item, index) => (
                            <ProductCard key={index} data={item} flex={true} />
                        ))}
                    </div>
                </div>
                <hr />


                {/* card form */}
                <div className={classes.flex}>
                    <h3>Payment Method</h3>
                    <div className={classes.payment__card__container}>
                        <div className={classes.payment_details}>
                            <form action="" onSubmit={handlePayment}>
                                {error && (
                                    <small style={{ color: "red", padding: "10px" }}>{error}</small>
                                )}
                                <CardElement onChange={handleChange} />
                                {/* Price payment */}
                                <div className={classes.payment_price}>
                                    <div style={{ marginBottom: "15px" }}>
                                        <span className={classes.flex}>
                                            <b>Total Order</b> |<CurrencyFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type="submit">
                                        {process ? (
                                            <div className={classes.loading}>
                                                <ClipLoader color="gray" size={12} />
                                                <p>Please Wait ...</p>
                                            </div>
                                        ) : (
                                            " Pay Now"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Payment