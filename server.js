const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API routes
app.use("/api", apiRoutes);

// HTML routes
app.use("/", htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`);
});
