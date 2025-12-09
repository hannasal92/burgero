import './css/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import { RouterProvider } from "react-router-dom";
import router from "./route.jsx";

function App() {
    return <RouterProvider router={router} />;

}

export default App;