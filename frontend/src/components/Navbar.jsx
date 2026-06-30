import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">HouseHunt</Link>
        <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2 flex-row gap-2 flex-wrap">
          <NavLink className="nav-link" to="/">Browse</NavLink>
          {user && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}
          {user && <NavLink className="nav-link" to="/bookings">Bookings</NavLink>}
          {user && <NavLink className="nav-link" to="/properties/new">Post Listing</NavLink>}
          {user?.role === 'admin' && <NavLink className="nav-link" to="/admin">Admin</NavLink>}
          {!user ? (
            <>
              <NavLink className="btn btn-outline-light btn-sm" to="/login">Login</NavLink>
              <NavLink className="btn btn-warning btn-sm" to="/register">Register</NavLink>
            </>
          ) : (
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
