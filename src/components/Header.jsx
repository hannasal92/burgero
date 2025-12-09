import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Header.module.css";
import { useState } from "react";
import CartIcon from "../components/common/CartIcon";
import Button from "../components/common/Button";
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const slides = [
    {
      title: "מסעדת בורגיר",
      text:
        "המסעדה שלנו מציעה מגוון המבורגרים עסיסיים, טריים ומיוחדים, בשילוב טעמים ייחודיים, רטבים ביתיים ולחמניות חמות, עם שירות מקצועי, אווירה נעימה וחוויית אוכל בלתי נשכחת לכל לקוח."
    },
    {
      title: "מסעדת בורגיר",
      text:
        "המסעדה שלנו מציעה מגוון המבורגרים עסיסיים, טריים ומיוחדים, בשילוב טעמים ייחודיים, רטבים ביתיים ולחמניות חמות, עם שירות מקצועי, אווירה נעימה וחוויית אוכל בלתי נשכחת לכל לקוח."
    },
    {
      title: "מסעדת בורגיר",
      text:
        "המסעדה שלנו מציעה מגוון המבורגרים עסיסיים, טריים ומיוחדים, בשילוב טעמים ייחודיים, רטבים ביתיים ולחמניות חמות, עם שירות מקצועי, אווירה נעימה וחוויית אוכל בלתי נשכחת לכל לקוח."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  let sliderRef = null;
  return (
      <div className={styles.heroArea}>       {/* Background Image */}
      <div className="bg-box">
        <img src="./src/images/hero-bg.jpg" alt="" />
      </div>

      {/* ---------------- HEADER ---------------- */}
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <Link className="navbar-brand" to="/home"><span>Burgero</span></Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item active"><Link className="nav-link" to="/home">בית</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/menue">תפריט</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">עלינו</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/bookTable">הזמנת שולחן</Link></li>
              </ul>

           <div className="user_option">
              {/* User Icon */}
              <Link to="/Login" className="user_link">
                <i className="fa fa-user"></i>
              </Link>

               <Link className="cart_link" to="#">
                <CartIcon />
              </Link>
              {/* Search Form */}
              <form className="form-inline">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>

              {/* Order Online Link */}
            <Button className="order_online">
              תזמין אונליין
            </Button>
              {/* Cart Icon */}
           
            </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ---------------- SLIDER SECTION ---------------- */}
      <Slider ref={slider => (sliderRef = slider)} {...settings}>
        {slides.map((slider, index) => (
          <div key={index} className={styles.sliderItem}>
            <div className={styles.overlay}></div>

            <div className={styles.textBox}>
              <h1 className={styles.title}>{slider.title}</h1>
              <p className={styles.text}>{slider.text}</p>

            <div className={styles.btnBox}>
            <Button className={styles.btn1}>
              תזמין עכשיו
            </Button>
          </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}