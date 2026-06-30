export const demoProperties = [
  {
    _id: 'demo-1',
    title: 'Sunny 2BHK Apartment Near City Center',
    description: 'A bright, well-ventilated apartment with security, lift access, covered parking, and quick access to schools, shops, and public transport.',
    location: 'Bengaluru',
    address: 'Indiranagar, Bengaluru',
    price: 32000,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Parking', 'Lift', 'Security', 'Balcony'],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    owner: { name: 'Demo Owner', email: 'owner@househunt.com' }
  },
  {
    _id: 'demo-2',
    title: 'Modern Studio For Working Professionals',
    description: 'Compact furnished studio with fast internet, modular kitchen, power backup, and easy commute routes for professionals.',
    location: 'Mumbai',
    address: 'Powai, Mumbai',
    price: 28000,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Furnished', 'Power Backup'],
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    owner: { name: 'Demo Owner', email: 'owner@househunt.com' }
  },
  {
    _id: 'demo-3',
    title: 'Family Villa With Garden',
    description: 'Spacious villa with private garden, three bedrooms, quiet surroundings, and premium community amenities.',
    location: 'Hyderabad',
    address: 'Gachibowli, Hyderabad',
    price: 65000,
    type: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['Garden', 'Clubhouse', 'Parking', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    owner: { name: 'Demo Owner', email: 'owner@househunt.com' }
  },
  {
    _id: 'demo-4',
    title: 'Affordable PG With Meals',
    description: 'Comfortable PG accommodation with meals, housekeeping, WiFi, and shared common areas near colleges and offices.',
    location: 'Pune',
    address: 'Hinjewadi, Pune',
    price: 12000,
    type: 'PG',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Meals', 'WiFi', 'Housekeeping'],
    imageUrl: 'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1200&q=80',
    owner: { name: 'Demo Owner', email: 'owner@househunt.com' }
  }
];

export const filterDemoProperties = (filters = {}) => {
  return demoProperties.filter((property) => {
    const locationMatch = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());
    const typeMatch = !filters.type || property.type === filters.type;
    const minMatch = !filters.minPrice || property.price >= Number(filters.minPrice);
    const maxMatch = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    return locationMatch && typeMatch && minMatch && maxMatch;
  });
};
