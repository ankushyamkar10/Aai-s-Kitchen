const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const colors = require("colors");
var cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3001;

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({ extended: true,limit:'50mb',parameterLimit:50000 }));
app.use(express.json({limit: '50mb'}));

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/order", require("./Routes/orderRoutes"));
app.use("/api/product", require("./Routes/productRoutes"));
app.use("/api/stripe", require("./Routes/stripeRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route Not Found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`.yellow.underline);
});
