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
  //   getRowsFromAllSheets,
} = require("./Drive");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.post("/dashboard/addPatients", (req, res) => {
  const {
    PhysicianID,
    PatientID,
    first_name,
    last_name,
    Location,
    Gender,
    Address,
    Phone,
    Age,
    Next_Visit,
    Prescription,
    Dose,
    Visit_Date,
    Physician_first_name,
    Physician_last_name,
    PhysicianNumber,
    Bill,
  } = req.body;

  const addPatient = async () => {
    try {
      const sheetName = "appointment";
      const sheet = await getGoogleSheet(sheetName);

      await addRowToSheet(sheet, {
        appointmentID: "123",
        PatientID: PatientID,
        PhysicianID: PhysicianID,
        Visit_Date: Visit_Date,
        Next_Visit: Next_Visit,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
    try {
      const sheetName = "prescribes";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        PhysicianID: PhysicianID,
        PatientID: PatientID,
        Prescription: Prescription,
        Dose: Dose,
        Bill: Bill,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

    try {
      const sheetName = "patient";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        First_Name: first_name,
        Last_Name: last_name,
        Address: Address,
        Location: Location,
        Age: Age,
        Gender: Gender,
        Phone: Phone,
        PatientID: PatientID,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

    try {
      const sheetName = "physician";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        PhysicianID: PhysicianID,
        Physician_first_name: Physician_first_name,
        Physician_last_name: Physician_last_name,
        PhysicianNumber: PhysicianNumber,
        PatientID: PatientID,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
    res.status(200).send("Success");
  };
  addPatient();
});

// getRowsFromAllSheets();

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
