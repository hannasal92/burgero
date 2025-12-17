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
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // ✅ Start spinner

    if (!user) {
      setError("עליך להתחבר כדי להזמין שולחן");
      setTimeout(() => navigate("/login"), 1500);
      setLoading(false);
      return;
    }

    try {
      await bookTableApi.book(form);

      setSuccess("הזמנת השולחן בוצעה בהצלחה תחכה טלפון לאשר את ההזמנה✅");
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
      setLoading(false); // ✅ Stop spinner
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
                  required
                />

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="מספר טלפון"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="דואר אלקטרוני"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <select
                  name="people"
                  className="form-control"
                  value={form.people}
                  onChange={handleChange}
                  required
                >
                  <option value="">כמה אנשים</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={form.date}
                  onChange={handleChange}
                  required
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