const Tour = require('../model/tourModel');

// Route handlers
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: { tours },
  });
};

exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
  // Update tours send response
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
