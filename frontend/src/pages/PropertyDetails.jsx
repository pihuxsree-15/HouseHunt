import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/api.js';
import Alert from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { demoProperties } from '../data/demoProperties.js';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const [booking, setBooking] = useState({ moveInDate: '', message: '' });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const { data } = await api.get('/properties/' + id);
        setProperty(data);
        setUsingDemo(false);
      } catch (error) {
        setProperty(demoProperties.find((item) => item._id === id));
        setUsingDemo(true);
      }
    };
    loadProperty();
  }, [id]);

  const requestBooking = async (event) => {
    event.preventDefault();
    setNotice('');
    setError('');
    if (usingDemo) {
      setNotice('Demo booking request captured. Connect MongoDB to save bookings permanently.');
      setBooking({ moveInDate: '', message: '' });
      return;
    }
    try {
      await api.post('/bookings', { propertyId: id, ...booking });
      setNotice('Booking request sent to the property owner.');
      setBooking({ moveInDate: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to request booking.');
    }
  };

  if (!property) return <main className="container py-5">Loading property...</main>;

  return (
    <main className="container py-5">
      {usingDemo && <div className="alert alert-warning">Showing demo property data because MongoDB is not connected.</div>}
      <div className="row g-4">
        <div className="col-lg-7"><img className="detail-image" src={property.imageUrl} alt={property.title} /></div>
        <div className="col-lg-5">
          <span className="badge text-bg-dark mb-3">{property.type}</span>
          <h1 className="h2">{property.title}</h1>
          <p className="text-muted">{property.address}, {property.location}</p>
          <h2 className="h4 text-success">Rs. {Number(property.price).toLocaleString()}/month</h2>
          <p>{property.description}</p>
          <div className="d-flex gap-4 mb-3"><span>{property.bedrooms} Bedrooms</span><span>{property.bathrooms} Bathrooms</span></div>
          <div className="mb-3">{property.amenities?.map((amenity) => <span className="badge rounded-pill text-bg-light me-2 mb-2" key={amenity}>{amenity}</span>)}</div>
          {property.virtualTourUrl && <a className="btn btn-outline-dark mb-3" href={property.virtualTourUrl} target="_blank" rel="noreferrer">Open Virtual Tour</a>}
          <div className="owner-box"><strong>Owner</strong><p className="mb-0">{property.owner?.name}</p><small>{property.owner?.email}</small></div>
        </div>
      </div>
      <section className="booking-panel mt-4">
        <h2 className="h4">Request Booking</h2>
        {!user ? <p className="mb-0"><Link to="/login">Login</Link> to request a visit or booking.</p> : (
          <form onSubmit={requestBooking}>
            <Alert type="success">{notice}</Alert><Alert type="danger">{error}</Alert>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label">Preferred Move-in Date</label><input type="date" className="form-control" value={booking.moveInDate} onChange={(event) => setBooking({ ...booking, moveInDate: event.target.value })} required /></div>
              <div className="col-md-6"><label className="form-label">Message</label><input className="form-control" value={booking.message} onChange={(event) => setBooking({ ...booking, message: event.target.value })} placeholder="Share timing, family size, or questions" /></div>
              <div className="col-md-2 d-flex align-items-end"><button className="btn btn-warning w-100">Send</button></div>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default PropertyDetails;
