import express from 'express';
import {
  approveProperty,
  createProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
  updateProperty
} from '../controllers/propertyController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import optionalAuth from '../middleware/optionalAuth.js';

const router = express.Router();

router.get('/', optionalAuth, getProperties);
router.get('/:id', optionalAuth, getPropertyById);
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.patch('/:id/approve', protect, authorize('admin'), approveProperty);

export default router;
