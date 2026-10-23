const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const livrosRoute = require("./routes/livrosRoute");
const autoresRoute = require("./routes/autoresRoute");
const generosRoute = require("./routes/generosRoute");
const usuariosRoute = require("./routes/usuariosRoute");
const emprestimosRoute = require("./routes/emprestimosRoute");

app.use(express.json());
app.use("/livros", livrosRoute);
app.use("/autores", autoresRoute);
app.use("/generos", generosRoute);
app.use("/usuarios", usuariosRoute);
app.use("/emprestimos", emprestimosRoute);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});