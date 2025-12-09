import { Link } from 'react-router-dom';
import '../css/style.css';

export default function Login() {
  return (
    <div className="page-container">

      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        
        <h2 style={{ textAlign: "center" }}> תתחבר למערכת </h2>

        <section className="book_section layout_padding">
          <div className="container">
            <div className="row">
              
              <div className="col-md-6 mx-auto">
                <div className="form_container">
                  
                  <form action="">
                    
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="דואר אלקטרוני" 
                      />
                    </div>

                    <div>
                      <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="סיסמה" 
                      />
                    </div>

                    <div className="btn_box">
                      <button type="submit">תתחבר</button>
                    </div>

                    {/* --- SIGN UP LINK --- */}
                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                      אין לך חשבון?{" "}
                      <Link to="/signup" style={{ color: "#ffbe33", fontWeight: "bold" }}>
                        הירשם עכשיו
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}