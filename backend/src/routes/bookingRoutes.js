import express from 'express';
import { createBooking, getMyBookings, getOwnerBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/my', getMyBookings);
router.get('/owner', getOwnerBookings);
router.post('/', createBooking);
router.patch('/:id/status', updateBookingStatus);

export default router;
