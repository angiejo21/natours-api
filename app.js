const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (res, req) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    // same name as the resource
    data: { tours },
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// //route handler (res-req callback function)
// app.get("/api/v1/tours", getAllTours);
// //conditional parameters "/:id?", chained parameters "/:id/:x/:y?"
// app.get("/api/v1/tours/:id", getTour);
// //
// app.post("/api/v1/tours", createTour);
// //PUT entire object, PATCH only properties to update
// app.patch("/api/v1/tours/:id", updateTour);
// //DELETE
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

////////LISTENING
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
