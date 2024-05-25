// server.js

// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Serve static files (your React app)
app.use(express.static(path.join(__dirname, "build")));

// Proxy requests to URA API
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://www.ura.gov.sg",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

// Handle any other routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
