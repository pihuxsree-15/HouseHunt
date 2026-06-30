import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moveInDate: { type: Date, required: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['requested', 'accepted', 'rejected', 'cancelled'], default: 'requested' }
  },
  { timestamps: true }
);

bookingSchema.index({ property: 1, tenant: 1 });

export default mongoose.model('Booking', bookingSchema);
