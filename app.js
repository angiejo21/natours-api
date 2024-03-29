const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3)ROUTES

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

//MOUNTING ROUTERS
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
