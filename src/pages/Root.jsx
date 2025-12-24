import { Outlet } from 'react-router-dom'
import HeaderSp from '../components/HeaderSp'
import Footer from '../components/Footer'
export default function RootLayout(){
    return (
        <>
        <HeaderSp />
        <Outlet />
        <Footer />
        </>
    )
} 