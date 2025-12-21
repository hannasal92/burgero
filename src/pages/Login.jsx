import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

import "../css/style.css";

export default function Login() {
  const navigate = useNavigate();
 const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "שים לב, כל השדות חייבים להיות מלאים";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "נא להזין דואר אלקטרוני תקין";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    try {
      setLoading(true);
      setErrors("");

      const data = await loginRequest(form);
      login(data);
      navigate("/cart"); // redirect after login
  

    } catch (error) {
      if(error.response?.data.error){
        setErrors(error.response?.data.error);
      }else{
        setErrors(error.message);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        
        <h2 style={{ textAlign: "center" }}> תתחבר למערכת </h2>

        <section className="book_section layout_padding">
          <div className="container">
            <div className="row">
              
              <div className="col-md-6 mx-auto">
                <div className="form_container">

                  {errors && (
                    <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                      {errors}
                    </p>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    
                    <div>
                      <input 
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="דואר אלקטרוני"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <input 
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="סיסמה"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="btn_box">
                      <button type="submit" disabled={loading}>
                        {loading ? "טוען..." : "תתחבר"}
                      </button>
                    </div>

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