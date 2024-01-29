const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
  //parameters object
  console.log(req.params);
  const id = +req.params.id;
  //CHECK FOR NON-EXISTENT TOUR
  //or after .find and check for !tour
  if (id > tours.length) {
    //404 "not found"
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }
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
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }
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
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }
  //204 means NO CONTENT
  res.status(204).json({
    status: "success",
    data: null,
  });
};
