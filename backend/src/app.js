// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');

// const app = express();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));

// app.use('/auth', require('./routes/authRoutes'));
// app.use('/admin', require('./routes/adminRoutes'));
// app.use('/training', require('./routes/trainingRoutes'));
// app.use('/waste', require('./routes/wasteRoutes'));
// app.use('/reports', require('./routes/reportRoutes'));
// app.use('/vehicles', require('./routes/vehicleRoutes'));
// app.use('/routes', require('./routes/routeRoutes'));
// app.use('/facilities', require('./routes/facilityRoutes'));
// app.use('/shop', require('./routes/shopRoutes'));
// app.use('/reward-penalty', require('./routes/rewardPenaltyRoutes'));
// app.use('/analytics', require('./routes/analyticsRoutes'));
// app.use('/green-champion', require('./routes/greenChampionRoutes'));
// app.use('/coupon', require('./routes/couponRoutes'));
// app.use('/reports', require('./routes/reportRoutes'));
// app.use('/reward-offers', require('./routes/rewardOfferRoutes')); 

// app.use(require('./middlewares/error'));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Backend server running on port ${PORT}`);
// });







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Fix __dirname for CommonJS
const __dirnameFull = path.resolve();

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ⭐ FIXED CERTIFICATE STATIC PATH
// This points to: backend/src/certificates
app.use(
  "/certificates",
  express.static(path.join(__dirnameFull, "src", "certificates"))
);
app.use("/uploads", express.static(path.join(__dirnameFull, "uploads")));
// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/training", require("./routes/trainingRoutes"));
app.use("/waste", require("./routes/wasteRoutes"));
app.use("/reports", require("./routes/reportRoutes"));
app.use("/vehicles", require("./routes/vehicleRoutes"));
app.use("/routes", require("./routes/routeRoutes"));
app.use("/facilities", require("./routes/facilityRoutes"));
app.use("/shop", require("./routes/shopRoutes"));
app.use("/reward-penalty", require("./routes/rewardPenaltyRoutes"));
app.use("/analytics", require("./routes/analyticsRoutes"));
app.use("/green-champion", require("./routes/greenChampionRoutes"));
app.use("/coupon", require("./routes/couponRoutes"));
app.use("/reward-offers", require("./routes/rewardOfferRoutes"));

app.use(require("./middlewares/error"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
