import { useState } from "react";
import { Link } from "react-router-dom";
import { signupRequest } from "../api/authApi";
import { useNavigate } from "react-router-dom";
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

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "נא להזין שם";
    if (!form.phone.trim()) newErrors.phone = "נא להזין מספר טלפון";

    if (!form.email.trim()) newErrors.email = "נא להזין אימייל";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "האימייל אינו תקין";

    if (form.email !== form.confirmEmail)
      newErrors.confirmEmail = "האימיילים אינם תואמים";

    if (form.password.length < 6)
      newErrors.password = "הסיסמה חייבת להיות לפחות 6 תווים";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "הסיסמאות אינן תואמות";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setSuccess("");

    if (!validate()) return;

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

        setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setServerError(err.response?.data?.message || "שגיאה בשרת");
    }
  };

  return (
    <div className="page-container">
      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center" }}> תירשם למערכת </h2>

        <section className="book_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="form_container">

                  <form onSubmit={handleSubmit}>

                    {success && (
                      <p style={{ color: "green", textAlign: "center" }}>{success}</p>
                    )}
                    {serverError && (
                      <p style={{ color: "red", textAlign: "center" }}>{serverError}</p>
                    )}

                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="השם"
                        onChange={handleChange}
                      />
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="מספר טלפון"
                        onChange={handleChange}
                      />
                      {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="דואר אלקטרוני"
                        onChange={handleChange}
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {/* Confirm Email */}
                    <div>
                      <input
                        type="email"
                        name="confirmEmail"
                        className="form-control"
                        placeholder="אימות דואר אלקטרוני"
                        onChange={handleChange}
                      />
                      {errors.confirmEmail && (
                        <p className="error">{errors.confirmEmail}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="סיסמה"
                        onChange={handleChange}
                      />
                      {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="אימות סיסמה"
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="btn_box">
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