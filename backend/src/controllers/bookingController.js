import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

export const createBooking = async (req, res, next) => {
  try {
    const { propertyId, moveInDate, message } = req.body;
    const property = await Property.findById(propertyId);
    if (!property || property.status !== 'approved') {
      res.status(404);
      throw new Error('Property is not available for booking.');
    }

    const booking = await Booking.create({ property: propertyId, tenant: req.user._id, moveInDate, message });
    res.status(201).json(await booking.populate('property'));
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ tenant: req.user._id }).populate('property').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getOwnerBookings = async (req, res, next) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).select('_id');
    const propertyIds = properties.map((property) => property._id);
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate('tenant', 'name email phone')
      .populate('property')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found.');
    }

    const isOwner = booking.property.owner.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You cannot update this booking.');
    }

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
