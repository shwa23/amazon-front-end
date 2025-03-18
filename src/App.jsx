import React, { useContext, useEffect } from "react"
import Header from "./Components/Header/Header"
import Carousel from "./Components/Carousel/Carousel"
import Catagory from "./Components/Catagory/Catagory"
import Product from "./Components/Product/Product"
import Landing from "./Pages/Landing/Landing"
import Routing from "./Routing"
import { auth } from "./Utility/firebase"
import { DataContext } from "./Components/DataProvider/DataProvidere"
import { Type } from "./Utility/action.type"

function App() {
  const [{ user }, dispatch] = useContext(DataContext)
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      }
      else {
        dispatch({
          type: Type.SET_USER,
          user: null
        })
      }
    })
  }, [])
  return (
    <div>
      <Routing /> hhhhh
    </div>
  )
}

export default App
