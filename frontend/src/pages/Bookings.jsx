import { useEffect, useState } from 'react';
import api from '../api/api.js';

const Bookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const load = async () => { const [mine, owner] = await Promise.all([api.get('/bookings/my'), api.get('/bookings/owner')]); setMyBookings(mine.data); setOwnerBookings(owner.data); };
  useEffect(() => { load(); }, []);
  const updateStatus = async (id, status) => { await api.patch('/bookings/' + id + '/status', { status }); load(); };

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">Bookings</h1>
      <section className="mb-5"><h2 className="h4">My Requests</h2><div className="row g-3">
        {myBookings.map((booking) => <div className="col-md-6" key={booking._id}><div className="booking-card"><h3 className="h5">{booking.property?.title}</h3><p className="mb-1">{new Date(booking.moveInDate).toLocaleDateString()}</p><span className="badge text-bg-secondary">{booking.status}</span></div></div>)}
        {!myBookings.length && <p className="text-muted">No booking requests sent.</p>}
      </div></section>
      <section><h2 className="h4">Requests For My Properties</h2><div className="row g-3">
        {ownerBookings.map((booking) => <div className="col-md-6" key={booking._id}><div className="booking-card"><h3 className="h5">{booking.property?.title}</h3><p className="mb-1">{booking.tenant?.name} wants to move in on {new Date(booking.moveInDate).toLocaleDateString()}</p><p className="small text-muted">{booking.message}</p><div className="d-flex gap-2"><button className="btn btn-sm btn-success" onClick={() => updateStatus(booking._id, 'accepted')}>Accept</button><button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(booking._id, 'rejected')}>Reject</button></div></div></div>)}
        {!ownerBookings.length && <p className="text-muted">No incoming requests yet.</p>}
      </div></section>
    </main>
  );
};

export default Bookings;
