import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing/Landing"
import Auth from "./Pages/Auth/Auth"
import Orders from "./Pages/Orders/Orders"
import Cart from "./Pages/Cart/Cart"
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
import Payment from "./Pages/Payment/Payment"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51R2QhzDap7n9PTXQL80DKbX7zaxJfsOupho3EGwJuRfRvZdJaDPKpWwRDavQeMfKH4oy6A0h4ytLg1mBMOUqYu1g002XU0zMd1');
function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/payment' element={
                    <ProtectedRoute
                        msg={"Please Login to Continue with payment"}
                        redirect={"/payment"}
                    >
                        <Elements stripe={stripePromise} >
                            <Payment />
                        </Elements>
                    </ProtectedRoute>
                } />


                <Route path='/orders' element={

                    <ProtectedRoute
                        msg={"Please Login to Continue your orders"}
                        redirect={"/orders"}
                    >
                        <Orders />

                    </ProtectedRoute>

                } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Routing
