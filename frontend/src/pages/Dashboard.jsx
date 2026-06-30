import { useEffect, useState } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const load = async () => { const { data } = await api.get('/properties', { params: { mine: true } }); setProperties(data); };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { await api.delete('/properties/' + id); load(); };

  return (
    <main className="container py-5">
      <div className="dashboard-header"><div><p className="text-muted mb-1">Welcome back</p><h1 className="h2 mb-0">{user?.name}</h1></div><div className="stat-tile"><span>{properties.length}</span><small>Your listings</small></div></div>
      <section className="mt-4">
        <h2 className="h4 mb-3">My Properties</h2>
        <div className="table-responsive panel-table"><table className="table align-middle mb-0"><thead><tr><th>Property</th><th>Location</th><th>Price</th><th>Status</th><th></th></tr></thead><tbody>
          {properties.map((property) => <tr key={property._id}><td>{property.title}</td><td>{property.location}</td><td>Rs. {Number(property.price).toLocaleString()}</td><td><span className="badge text-bg-secondary">{property.status}</span></td><td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={() => remove(property._id)}>Delete</button></td></tr>)}
          {!properties.length && <tr><td colSpan="5" className="text-muted">No listings yet.</td></tr>}
        </tbody></table></div>
      </section>
    </main>
  );
};

export default Dashboard;
