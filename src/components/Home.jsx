
import About from "../pages/About.jsx";
import BookTable from "../pages/BookTable.jsx";
import Menu from "../pages/Menu.jsx";
import Client from "./Client.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Offer from "./offer.jsx";

export default function Home() {
    return (
            <>
            <Header/>
            <Offer />
            <Menu />
            <About />
            <BookTable />
            <Client />
            <Footer />
            </>
    )
}