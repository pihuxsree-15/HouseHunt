import Property from '../models/Property.js';

const canEditProperty = (user, property) => {
  return user.role === 'admin' || property.owner.toString() === user._id.toString();
};

export const getProperties = async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice, type, status, mine, q } = req.query;
    const filters = {};

    if (req.user?.role === 'admin' && status) {
      filters.status = status;
    } else {
      filters.status = 'approved';
    }

    if (mine === 'true' && req.user) {
      filters.owner = req.user._id;
      delete filters.status;
    }

    if (location) filters.location = { $regex: location, $options: 'i' };
    if (type) filters.type = type;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (q) filters.$text = { $search: q };

    const properties = await Property.find(filters)
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) {
      res.status(404);
      throw new Error('Property not found.');
    }

    if (property.status !== 'approved' && (!req.user || !canEditProperty(req.user, property))) {
      res.status(403);
      throw new Error('This property is not available.');
    }

    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user._id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error('Property not found.');
    }
    if (!canEditProperty(req.user, property)) {
      res.status(403);
      throw new Error('You can only update your own listings.');
    }

    Object.assign(property, req.body);
    if (req.user.role !== 'admin') property.status = 'pending';
    await property.save();
    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error('Property not found.');
    }
    if (!canEditProperty(req.user, property)) {
      res.status(403);
      throw new Error('You can only delete your own listings.');
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted.' });
  } catch (error) {
    next(error);
  }
};

export const approveProperty = async (req, res, next) => {
  try {
    const { status } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error('Property not found.');
    }

    property.status = status || 'approved';
    await property.save();
    res.json(property);
  } catch (error) {
    next(error);
  }
};
