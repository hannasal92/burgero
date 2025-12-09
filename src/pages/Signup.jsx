import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="page-container">

      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        
        <h2 style={{ textAlign: "center" }}> תירשם למערכת </h2>

        <section className="book_section layout_padding">
          <div className="container">
            <div className="row">
              
              <div className="col-md-6 mx-auto">
                <div className="form_container">
                  
                  <form>
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="השם" 
                      />
                    </div>

                    <div>
                      <input 
                        type="text" 
                        name="phone" 
                        className="form-control" 
                        placeholder="מספר טלפון" 
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="דואר אלקטרוני" 
                      />
                    </div>

                    {/* Confirm Email */}
                    <div>
                      <input 
                        type="email" 
                        name="confirmEmail" 
                        className="form-control" 
                        placeholder="אימות דואר אלקטרוני" 
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="סיסמה" 
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        className="form-control" 
                        placeholder="אימות סיסמה" 
                      />
                    </div>

                    <div className="btn_box">
                      <button type="submit">תירשם</button>
                    </div>

                    {/* Already have an account? */}
                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                      כבר יש לך חשבון?{" "}
                      <Link 
                        to="/login" 
                        style={{ color: "#ffbe33", fontWeight: "bold" }}
                      >
                        התחבר
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