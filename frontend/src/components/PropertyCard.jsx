import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <article className="property-card h-100">
      <img src={property.imageUrl} alt={property.title} className="property-card__image" />
      <div className="property-card__body">
        <div className="d-flex justify-content-between gap-3">
          <span className="badge text-bg-light">{property.type}</span>
          <strong className="text-success">Rs. {Number(property.price).toLocaleString()}/mo</strong>
        </div>
        <h2 className="h5 mt-3 mb-1">{property.title}</h2>
        <p className="text-muted mb-2">{property.location}</p>
        <p className="small line-clamp">{property.description}</p>
        <div className="d-flex justify-content-between small text-muted mb-3">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.amenities?.length || 0} Amenities</span>
        </div>
        <Link to={'/properties/' + property._id} className="btn btn-dark w-100">View Details</Link>
      </div>
    </article>
  );
};

export default PropertyCard;
