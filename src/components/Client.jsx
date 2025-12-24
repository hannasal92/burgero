import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../css/Client.css";
import client1 from '/images/client1.jpg';
import client2 from '/images/client2.jpg';

export default function Client() {

  const clients = [
    {
      name: "מואנה מישל",
      text: "שירות מצוין, האוכל היה טעים מאוד והצוות היה אדיב ומקצועי.",
      subText: "אוכל מצוין",
      img: client1,
    },
    {
      name: "מייק האמיל",
      text: "חוויה נהדרת! האווירה במקום נעימה והשולחנות תמיד נקיים ומסודרים.",
      subText: "חוויה נהדרת",
      img: client2,
    },
    {
      name: "שרה לוי",
      text: "הזמנתי שולחן לארוחת ערב והכל היה מושלם. בהחלט אחזור שוב!",
      subText: "שירות מושלם",
      img: client1,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // we hide default arrows
    rtl: true, // ✅ Enable RTL
  };

  let sliderRef = null;

  return (
    <section className="client_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center psudo_white_primary mb_45">
          <h2>מה הלקחות אומרים עלינו</h2>
        </div>

        {/* Slider */}
        <Slider ref={slider => (sliderRef = slider)} {...settings}>
          {clients.map((client, index) => (
            <div className="item" key={index}>
              <div className="box">
                <div className="detail-box">
                  <p>{client.text}</p>
                  <h6>{client.name}</h6>
                  <p>{client.subText}</p>
                </div>
                <div className="img-box">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="box-img"
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* ARROWS BELOW */}
        <div className="bottom-arrows-container">
          <button onClick={() => sliderRef.slickNext()} className="bottom-arrow">
            <FaArrowRight />
          </button>
                 <button onClick={() => sliderRef.slickPrev()} className="bottom-arrow">
            <FaArrowLeft />
          </button>
        </div>
      </div>
    </section>
  );
}