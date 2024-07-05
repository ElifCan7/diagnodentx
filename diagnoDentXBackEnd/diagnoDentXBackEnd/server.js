const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModal");
const productRoutes = require("./routes/productRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const patientDiseaseRoutes = require("./routes/patientDiseaseRoutes");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("HELLO ");
});

app.use("/product", productRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/patientDisease", patientDiseaseRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://username:password@myapi.spqcnjt.mongodb.net/")
  .then(() => {
    app.listen(3000, () => {
      console.log(`api is running on port 3000`);
    });
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log(error);
  });
