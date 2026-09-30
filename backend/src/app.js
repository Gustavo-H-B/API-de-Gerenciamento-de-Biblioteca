const express = require("express");
const app = express();

const livrosRoute = require("./routes/livrosRoute");
const autoresRoute = require("./routes/autoresRoute");
const generosRoute = require("./routes/generosRoute");
const usuariosRoute = require("./routes/usuariosRoute");
const emprestimosRoute = require("./routes/emprestimosRoute");

app.use(express.json());
app.use(livrosRoute);
app.use(autoresRoute);
app.use(generosRoute);
app.use(usuariosRoute);
app.use(emprestimosRoute);

module.exports = app;