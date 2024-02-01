const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//helper for the PARAM middleware
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

//2)ROUTE HANDLERS or CONTROLLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    // same name as the resource
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  //200 "Success"
  res.status(200).json({
    status: "success",
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //201 "Created"
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tours: "<Updated tour here>",
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  //204 means NO CONTENT
  res.status(204).json({
    status: "success",
    data: null,
  });
};
