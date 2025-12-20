import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationMap from "../components/common/LocationMap";
import { useAuth } from "../context/AuthContext";
import { bookTableApi } from "../api/bookTableApi";
import Spinner from "../components/common/Spinner"; // your spinner component

export default function BookTable() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    people: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const now = new Date();
  const pad = (num) => String(num).padStart(2, "0");

  // Format: YYYY-MM-DDTHH:MM
  const minDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const validateForm = () => {
    if (!form.name.trim()) return "אנא הזן את שמך";
    if (!form.phone.trim()) return "אנא הזן מספר טלפון";
    if (!/^\d{10}$/.test(form.phone)) return "מספר טלפון צריך להיות 10 ספרות";
    if (!form.email.trim()) return "אנא הזן דואר אלקטרוני";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "דואר אלקטרוני לא תקין";
    if (!form.people) return "אנא בחר מספר אנשים";
    if (!form.date) return "אנא בחר תאריך";
    if (new Date(form.date) < new Date().setHours(0,0,0,0)) return "התאריך חייב להיות עתידי";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("עליך להתחבר כדי להזמין שולחן");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await bookTableApi.book(form);
      setSuccess("הזמנת השולחן בוצעה בהצלחה! תחכה טלפון לאישור ההזמנה ✅");
      setForm({
        name: "",
        phone: "",
        email: "",
        people: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      setError("שגיאה בהזמנת שולחן, נסה שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>תזמין שולחן</h2>
        </div>

        <div className="row">
          {/* FORM */}
          <div className="col-md-6">
            <div className="form_container">
              <form onSubmit={handleSubmit}>
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
                dir="rtl"          // ✅ sets right-to-left input
                style={{ textAlign: "right" }} // optional, ensures text aligns right
              />

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="דואר אלקטרוני"
                  value={form.email}
                  onChange={handleChange}
                />

                <select
                  name="people"
                  className="form-control"
                  value={form.people}
                  onChange={handleChange}
                >
                  <option value="">כמה אנשים</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                  <input
                type="datetime-local"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                min={minDate} // disable past dates
              />

                {/* ERRORS / SUCCESS */}
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

                <div className="btn_box">
                  <button type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "תזמין עכשיו"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* MAP */}
          <div className="col-md-6">
            <div className="map_container">
              <LocationMap lat={32.0853} lng={34.7818} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}