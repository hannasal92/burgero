import { Link } from "react-router-dom";

export default function About(){
    return (
        <>
          <section className="about_section layout_padding">
            <div className="container  ">

            <div className="row">
                <div className="col-md-6 ">
                <div className="img-box">
                    <img src="./src/images/about-img.png" alt="" />
                </div>
                </div>
                <div className="col-md-6">
                <div className="detail-box">
                    <div className="heading_container">
                    <h2>
                        Burgero
                    </h2>
                    </div>
                    <p>
                     המסעדה שלנו מציעה מגוון המבורגרים עסיסיים, טריים ומיוחדים, בשילוב טעמים ייחודיים, רטבים ביתיים ולחמניות חמות, עם שירות מקצועי, אווירה נעימה וחוויית אוכל בלתי נשכחת לכל לקוח
                    </p>
                    <Link to="">
                    Read More
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}