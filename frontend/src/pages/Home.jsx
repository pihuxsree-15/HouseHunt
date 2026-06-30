import { useEffect, useState } from 'react';
import api from '../api/api.js';
import PropertyCard from '../components/PropertyCard.jsx';
import { filterDemoProperties } from '../data/demoProperties.js';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '', type: '' });

  const fetchProperties = async () => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    try {
      const { data } = await api.get('/properties', { params });
      setProperties(data);
      setUsingDemo(false);
    } catch (error) {
      setProperties(filterDemoProperties(filters));
      setUsingDemo(true);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProperties();
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-section__content">
          <div className="col-lg-7">
            <p className="text-warning fw-semibold mb-2">Rent smarter with real data</p>
            <h1 className="display-4 fw-bold">HouseHunt</h1>
            <p className="lead mb-0">Explore verified rentals, compare listings, request visits, and manage the complete rental journey from one responsive platform.</p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        {usingDemo && <div className="alert alert-warning">Showing demo listings because MongoDB is not connected.</div>}
        <form className="search-panel" onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Location</label>
              <input className="form-control" value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} placeholder="City or area" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Min Price</label>
              <input type="number" className="form-control" value={filters.minPrice} onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Max Price</label>
              <input type="number" className="form-control" value={filters.maxPrice} onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select className="form-select" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
                <option value="">Any type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Studio</option>
                <option>PG</option>
              </select>
            </div>
            <div className="col-md-2"><button className="btn btn-warning w-100">Search</button></div>
          </div>
        </form>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Available Rentals</h2>
          <span className="text-muted">{properties.length} listings</span>
        </div>
        {loading ? <div className="text-center py-5">Loading properties...</div> : (
          <div className="row g-4">
            {properties.map((property) => <div className="col-md-6 col-xl-4" key={property._id}><PropertyCard property={property} /></div>)}
            {!properties.length && <p className="text-muted">No matching rentals found.</p>}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
