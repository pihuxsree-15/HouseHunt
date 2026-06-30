import { useEffect, useState } from 'react';
import api from '../api/api.js';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState('pending');
  const load = async () => { const { data } = await api.get('/properties', { params: { status } }); setProperties(data); };
  useEffect(() => { load(); }, [status]);
  const updateStatus = async (id, nextStatus) => { await api.patch('/properties/' + id + '/approve', { status: nextStatus }); load(); };

  return (
    <main className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"><h1 className="h2 mb-0">Admin Moderation</h1><select className="form-select admin-status-select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
      <div className="row g-3">
        {properties.map((property) => <div className="col-lg-6" key={property._id}><div className="moderation-item"><img src={property.imageUrl} alt={property.title} /><div><span className="badge text-bg-light">{property.status}</span><h2 className="h5 mt-2">{property.title}</h2><p className="small text-muted mb-2">{property.location} by {property.owner?.name}</p><p className="small">{property.description}</p><div className="d-flex gap-2"><button className="btn btn-sm btn-success" onClick={() => updateStatus(property._id, 'approved')}>Approve</button><button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(property._id, 'rejected')}>Reject</button></div></div></div></div>)}
        {!properties.length && <p className="text-muted">No properties in this queue.</p>}
      </div>
    </main>
  );
};

export default AdminDashboard;
