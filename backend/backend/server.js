require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { connectDB } = require("./config/db");
const cors = require("cors");
const bodyParser = require('body-parser');

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));



app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use('/uploads', express.static('uploads'));
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
