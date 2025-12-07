import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../css/client.css";

export default function Client() {

  const clients = [
    {
      name: "Moana Michell",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      subText: "magna aliqua",
      img: "./src/images/client1.jpg",
    },
    {
      name: "Mike Hamell",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      subText: "magna aliqua",
      img: "./src/images/client2.jpg",
    },
    {
      name: "Mike Hamell",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      subText: "magna aliqua",
      img: "./src/images/client2.jpg",
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