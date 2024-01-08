const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getGoogleSheet, findRowByQuery, getAllRows } = require("./helper");
const { addPatientToDb, editPatientInDb } = require("./crud");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

app.post("/dashboard/addPatients", (req, res) => {
  addPatientToDb(req.body, res);
});

app.post("/dashboard/editPatient", (req, res) => {
  editPatientInDb(req.body, res);
});

app.get("/dashboard/search", async (req, res) => {
  const search = req.query.search;
  try {
    const sheet = await getGoogleSheet("patient");

    const data = await findRowByQuery(sheet, search);
    res.send({ data });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).send({ msg: "error", error: error.message });
  }
});

app.get("/dashboard/getAllDetails", (req, res) => {
  const getRowsFromAllSheets = async () => {
    const sheet = await getGoogleSheet("patient");

    const data = await getAllRows(sheet);
    res.send({ data });
  };
  getRowsFromAllSheets();
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
