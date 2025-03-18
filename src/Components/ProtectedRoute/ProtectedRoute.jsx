import { useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../components/DataProvider/DataProvider'


const ProtectedRoute = ({ children, msg, redirect }) => {
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [{ user }, dispatch] = useContext(DataContext)

    useEffect(() => {
        if (!user) {
            navigate("/auth", {
                state: { msg, redirect }
            })
        }
    }, [user])
    return (
        children
    )
}

export default ProtectedRoute