const server = require('./src/app.js');
const { conn } = require("./src/dbConex.js");
require('dotenv').config();


const PORT = process.env.PORT || 3002;

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
})