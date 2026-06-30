import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, index: true },
    address: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    type: { type: String, enum: ['Apartment', 'House', 'Villa', 'Studio', 'PG'], required: true, index: true },
    bedrooms: { type: Number, default: 1, min: 0 },
    bathrooms: { type: Number, default: 1, min: 0 },
    amenities: { type: [String], default: [] },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    },
    virtualTourUrl: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', description: 'text', location: 'text' });

export default mongoose.model('Property', propertySchema);
