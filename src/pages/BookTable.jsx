import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function BookTable() {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };
  const center = {
    lat: 40.7128, // replace with your latitude
    lng: -74.0060, // replace with your longitude
  };
  return (
    <section className="book_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>Book A Table</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form_container">
              <form action="">
                <div>
                  <input type="text" name="name" className="form-control" placeholder="השם" />
                </div>
                <div>
                  <input type="text" name="phone" className="form-control" placeholder="מספר טלפון" />
                </div>
                <div>
                  <input type="email" name="email" className="form-control" placeholder="דואר אלקטרוני" />
                </div>
                <div>
                  <select className="form-control nice-select wide" defaultValue="">
                    <option value="" >
                      כמה אנשים
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <input type="date" name="date" className="form-control" />
                </div>
                <div className="btn_box">
                  <button type="submit">תזמין עכשיו</button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="map_container">
               <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                />
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}