const Tour = require('../model/tourModel');

// Route handlers
exports.getAllTours = async (req, res) => {
  try {
    // 1. Build query
    // (a(i)) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // (a(ii)) Advanced filtering
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(lt|lte|gt|gte)\b/g,
      (match) => `$${match}`,
    );

    let query = Tour.find(JSON.parse(queryStr));

    // (b) Sorting
    const sortParameter = req.query.sort;

    if (sortParameter) {
      const sortBy = sortParameter.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // (c) Field limiting
    let { fields } = req.query;

    if (fields) {
      fields = fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 2. Execute query
    const tours = await query;

    // 3. Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid dataset' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};
