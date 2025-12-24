import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupRequest } from "../api/authApi";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // single sequential error
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    // Validate in order, stop at first error
    if (!form.name.trim()) return "נא להזין שם";

    if (!form.phone.trim()) return "נא להזין מספר טלפון";
    else if (!/^\d{10}$/.test(form.phone))
      return "מספר טלפון צריך להיות 10 ספרות";

    if (!form.email.trim()) return "נא להזין אימייל";
    else if (!/\S+@\S+\.\S+/.test(form.email)) return "האימייל אינו תקין";

    if (form.email !== form.confirmEmail) return "האימיילים אינם תואמים";

    if (form.password.length < 6) return "הסיסמה חייבת להיות לפחות 6 תווים";

    if (form.password !== form.confirmPassword) return "הסיסמאות אינן תואמות";

    return ""; // no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");
    setSuccess("");

    const firstError = validate();
    if (firstError) {
      setError(firstError);
      return;
    }

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
      };

      const data = await signupRequest(payload);
      setSuccess("נרשמת בהצלחה!");
      console.log("Success:", data);

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setServerError(err.response?.data?.message || "שגיאה בשרת");
    }
  };

  return (
    <div className="page-container">
      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center" }}>תירשם למערכת</h2>

        <section className="book_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="form_container">
                  <form onSubmit={handleSubmit}>
                    {/* Success / Server Error / Sequential Error */}
                    {(success || serverError || error) && (
                      <div style={{ textAlign: "center", marginBottom: "15px" }}>
                        {success && <p style={{ color: "green" }}>{success}</p>}
                        {serverError && <p style={{ color: "red" }}>{serverError}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                      </div>
                    )}

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="השם"
                      value={form.name}
                      onChange={handleChange}
                    />

                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="מספר טלפון"
                      value={form.phone}
                      onChange={handleChange}
                      dir="rtl"
                      style={{ textAlign: "right" }}
                    />

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="דואר אלקטרוני"
                      value={form.email}
                      onChange={handleChange}
                    />

                    <input
                      type="email"
                      name="confirmEmail"
                      className="form-control"
                      placeholder="אימות דואר אלקטרוני"
                      value={form.confirmEmail}
                      onChange={handleChange}
                    />

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="סיסמה"
                      value={form.password}
                      onChange={handleChange}
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="אימות סיסמה"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />

                    <div className="btn_box" style={{ marginTop: "20px" }}>
                      <button type="submit">תירשם</button>
                    </div>

                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                      כבר יש לך חשבון?{" "}
                      <Link to="/login" style={{ color: "#ffbe33", fontWeight: "bold" }}>
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