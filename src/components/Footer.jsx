export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>צור קשר</h4>
              <div className="contact_link_box">
                <a href="#">
                  <span>מיקום</span>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>

                </a>
                <a href="tel:+011234567890">
                  <span>תתקשר +01 1234567890</span>
                  <i className="fa fa-phone" aria-hidden="true"></i>

                </a>
                <a href="mailto:demo@gmail.com">
                  <span>burgero@gmail.com</span>
                  <i className="fa fa-envelope" aria-hidden="true"></i>

                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="#" className="footer-logo">burgero</a>
              <p>
                המסעדה שלנו מציעה מגוון המבורגרים עסיסיים, טריים ומיוחדים, בשילוב טעמים ייחודיים, רטבים ביתיים ולחמניות חמות, עם שירות מקצועי, אווירה נעימה וחוויית אוכל בלתי נשכחת לכל לקוח
              </p>
              <div className="footer_social">
                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>

          <div className="col-md-4 footer-col">
            <h4>שעות פתיחה</h4>
            <p>כל יום</p>
            <p> 15:00 - 23:00 </p>
          </div>
        </div>

        <div className="footer-info">
          <p>
            &copy; {year} כל הזכויות שמורות
            <a href="https://html.design/"> - Hanna Salameh</a><br /><br />
            &copy; {year} מופץ על-ידי
            <a href="https://themewagon.com/" target="_blank" rel="noreferrer"> Hanna Salameh</a>
          </p>
        </div>
      </div>
    </footer>
  );
}