import CartIcon from "../components/common/CartIcon";

const OfferBox = ({ img, title, discount, buttonText }) => (
  <div className="col-md-6">
    <div className="box">
      <div className="img-box">
        <img src={img} alt={title} />
      </div>

          <div className="detail-box" style={{ marginRight: "25px" }}>
        <h5>{title}</h5>
        <h6>
          <span>{discount}%</span> הנחה
        </h6>

        <a href="#" className="btn1">
          {buttonText}
          <CartIcon style={{marginRight:"5px"}}/>
        </a>
      </div>
    </div>
  </div>
);

export default function Offer() {
  // 🔥 Array for loop / map
  const offers = [
    {
      img: "./src/images/o1.jpg",
      title: "חמישי טעים",
      discount: 20,
      buttonText: "תזמין עכשיו",
    },
    {
      img: "./src/images/o2.jpg",
      title: "יום פיצה",
      discount: 15,
      buttonText: "תזמין עכשיו",
    }
  ];

  return (
    <section className="offer_section layout_padding-bottom">
      <div className="offer_container">
        <div className="container">
          <div className="row">

            {offers.map((item, index) => (
              <OfferBox key={index} {...item} />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}