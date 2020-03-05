const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
require("dotenv");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE
};

sql
  .connect(config)
  .then(conn => console.log("conectou!"))
  .catch(err => console.log("erro! " + err));

app.get("/", (req, res) => {
  return res.json({ msg: "chegou aqui " });
});

app.get("/funcionario", (req, res) => {
  let consulta = "SELECT * FROM Funcionario";
  sql.query(consulta, (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ result });
  });
});

app.listen(PORT, () => {
  console.log("server startado, na porta: " + PORT);
});
