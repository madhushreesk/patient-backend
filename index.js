const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  getGoogleSheet,
  addRowToSheet,
  printAllRows,
  findRow,
  updateRow,
  deleteRow,
} = require("./Drive");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.post("/dashboard/addPatients", (req, res) => {
  const {
    physicianID,
    patientID,
    patientName,
    location,
    gender,
    address,
    phone,
    age,
    prescription,
    dose,
    visit_date,
    next_visit,
    bill,
    physicianName,
    physicianNumber,
  } = req.body;

  const addPatient = async () => {
    try {
      const sheetName = "appointment";
      const sheet = await getGoogleSheet(sheetName);

      await addRowToSheet(sheet, {
        appointmentID: "123",
        patientID: patientID,
        physicianID: physicianID,
        visit_date: visit_date,
        next_visit: next_visit,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
    try {
      const sheetName = "prescribes";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        physicianID: physicianID,
        patientID: patientID,
        prescription: prescription,
        dose: dose,
        bill: bill,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

    try {
      const sheetName = "patient";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        patientName: patientName,
        address: address,
        location: location,
        age: age,
        gender: gender,
        phone: phone,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

    try {
      const sheetName = "physician";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        physicianID: physicianID,
        physicianName: physicianName,
        physicianNumber: physicianNumber,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
    res.status(200).send("Success");
  };
  addPatient();
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
