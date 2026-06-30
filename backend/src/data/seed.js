import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import User from '../models/User.js';

dotenv.config();

const sampleProperties = [
  {
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
    status: 'approved'
  },
  {
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
    status: 'approved'
  },
  {
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
    status: 'approved'
  },
  {
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
    status: 'approved'
  }
];

const runSeed = async () => {
  await connectDB();
  await Booking.deleteMany({});
  await Property.deleteMany({});
  await User.deleteMany({ email: { $in: ['owner@househunt.com', 'admin@househunt.com'] } });

  const owner = await User.create({
    name: 'Demo Owner',
    email: 'owner@househunt.com',
    password: 'password123',
    phone: '9999999999'
  });

  await User.create({
    name: 'Admin User',
    email: 'admin@househunt.com',
    password: 'password123',
    phone: '8888888888',
    role: 'admin'
  });

  await Property.insertMany(sampleProperties.map((property) => ({ ...property, owner: owner._id })));
  console.log('Sample HouseHunt listings added.');
  console.log('Admin login: admin@househunt.com / password123');
  console.log('Owner login: owner@househunt.com / password123');
  await mongoose.connection.close();
};

runSeed().catch(async (error) => {
  console.error(error.message);
  await mongoose.connection.close();
  process.exit(1);
});
