const express = require("express");
const { dbConnection } = require("./config/config");
const app = express();
const PORT = 3000;

dbConnection()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
