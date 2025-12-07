import './css/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Offer from './components/offer';
import Menu from './pages/Menu';
import About from './pages/About';
import BookTable from './pages/BookTable';
import Client from './components/Client';
function App() {
  return (
    <>
    <Header />
    <Offer />
    <Menu />
    <About />
    <BookTable />
    <Client />
    <Footer />
    </>
  );
}

export default App;