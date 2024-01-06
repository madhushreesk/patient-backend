const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const {
  getGoogleSheet,
  addRowToSheet,
  findRow,
  updateRow,
  deleteRow,
} = require("./Drive");

const CREDENTIALS = {
  type: "service_account",
  project_id: "able-memento-410214",
  private_key_id: "55c1daeb10e5711063ce48ffc3f6ba5858c7ed8e",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC++1/BK2vmEWZF\nvwqOLl2z0DugLmTpjOWBEOq38icqz+ynh7vL/hHcT+3dhgdHJqLFrUqxZla31J4y\nLthfmKYDA60ieA5ASOX26NIGj8rPVrp4e78HfGvbNCEwJGo7Uu77sIL7x2ODVdxL\nrg2hhRWUW1YgE/OhV8w+y1v/gHMmSNFkNuce/5ama7psLr/L5iPaGsK/P9ZZtSVY\nildmLNwVrXvAq5Fs7xffzka919/ZIG9lwz2GMTmlR0JNShRddkgykkWVpJxS63uQ\nzNrPiVE8VUpMzy9CC6L8lhYvkp0fJEDp9qxlfUPVlZ7R8iNK8/vasqclU4BHAn1K\nBmZKlcrJAgMBAAECggEAECSIQfgtHRvAZMnSlxUFN5M0zwPM5M7TgVbQOC8gL2a2\nzqxS69m0YcZhyTUwfUufO407wIXxc4Vlv8Ek6eOpuJyBcGXscnOW+IlSY1qZHnBq\nv49aJMRYC4W6/mo9jnkimSSg1a5TU4EY5061eT8aBVm5DGoTUEJvEam3w390fDpL\nBmo2hGsNyPVRIjHNbbIDj0prSjfhxZg/NYrESDAO/IP9n/R1p9ZNRLNIqOU7Xc3k\nq8I5rQFYZ8v6GCeoX9kc0AtDZ2lLsNAKPVm/21gNvX2tbnOE7f4UAxeif7Cpb2I3\nKreqVsngI7jwmVlyv2O7oIK0740RNEslD2DVb7rZrwKBgQDo9CrrnABpfJr+JTc7\nEgl1PrHWz6igLu4lQXF7oTiEaUNzu2meN8FcokrFHAfQQvlRLg9EyMzdOU+6O57u\nPr3qZJwjpg9eDXv9sAgnSIsIEM+YPAdLYV7kSo/JOav4G4AgZVhItNYekUNw0E+0\nO+EbQ8Ya/j37efYY78YgjS9JKwKBgQDR4Dgemtb2E4M7J+/63v9OrT/PmcOfjuXt\nIRp77K6wyvxKbpMMuh0osm58VRSDoInyZm4B4SMifIo3589+mHhsK3KuNYSaBfNW\nKZn3nmGqCBSLljmI59xSURW7U51YFvOQ19tpbDNiSZAFjmAupQmiQmJNVicFmsZo\niKeFpncZ2wKBgCVKaNB8kYhRXRJP7M507bSqC5fieBDkUlT+a+cpgL2ZiCWvm5Gr\nRTXJ+QQin5GUFwsKv4D4T+sd8IhUYPWsb4RlBKWkQJOCvxV2J2f6cd8hqcmp2lUT\nyjfrQ6cnp0K5TEJjVsWUxS3xfQVDI28rorZVnBHYHx3xgRau012EnEwvAoGAD4Mv\nIrP3J4ERthGhnz1USZBsov+OggCh5gEIYBiCYPbf5vB9Vfd7qEJoADCZr5DyIUSI\n5QKrAiWKYc90erryS6x6cX3rKyc9cSTqCG9gcJzgR+D2p7PbiQoNPSdU/enUXuRV\nh1lEAwPE7WQ0n737FE8rzOONRtDF0XwoRaykKPkCgYEAnSrTNNsw0mLInft/d41d\neIc5JZgzSDbDY5P1ABevJjVkTfvt7HvudKcAmKPugtllQQ4M5oaRcIJv9JHqAA1r\njmupQ/A7kaMywYVeTQNumaIKxtFerhBINRJiGGouUbPwA7p+8CbuL59WkW8TAON2\ngVQ2NSpeVoVXto0rf+87N4I=\n-----END PRIVATE KEY-----\n",
  client_email: "nest-359@able-memento-410214.iam.gserviceaccount.com",
  client_id: "100673792993612692273",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/nest-359%40able-memento-410214.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

const RESPONSES_SHEET_ID = "1eqfstDJns9feBFN7rW5pCKlHqg4yzhkryCa78_kM9Qs";

const jwt = new JWT({
  email: CREDENTIALS.client_email,
  key: CREDENTIALS.private_key,
  scopes: SCOPES,
});

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
        PhysicianID: PhysicianID,
        Physician_first_name: Physician_first_name,
        Physician_last_name: Physician_last_name,
        PhysicianNumber: PhysicianNumber,
        Prescription: Prescription,
        Bill: Bill,
        Dose: Dose,
        Visit_Date: Visit_Date,
        Next_Visit: Next_Visit,
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

const sheetTitle = { appointment: 0, prescribes: 1, patient: 2, physician: 3 };
app.get("/dashboard/getAllDetails", (req, res) => {
  const getRowsFromAllSheets = async () => {
    const allData = [];
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, jwt);
    await doc.loadInfo();
    for (const title of Object.keys(sheetTitle)) {
      const sheetIndex = sheetTitle[title];
      let sheet = doc.sheetsByIndex[sheetIndex];

      let rows = await sheet.getRows();

      console.log(rows);
      rows.forEach((row, index) => {
        const rowData = row._rawData;
        if (!allData[index]) {
          allData[index] = [...rowData];
        } else allData[index].push(...rowData);
      });
    }

    res.send({ msg: "success", allData });
  };
  getRowsFromAllSheets();
});

app.post("/dashboard/editPatient_form", (req, res) => {
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

  const editPatient = async () => {
    try {
      const sheetName = "appointment";
      const sheet = await getGoogleSheet(sheetName);

      await updateRow(sheet, PatientID, {
        appointmentID: "123",
        PatientID: PatientID,
        PhysicianID: PhysicianID,
        Visit_Date: Visit_Date,
        Next_Visit: Next_Visit,
      });
    } catch (error) {
      console.error("An error occurred in edit:", error.message);
    }
    try {
      const sheetName = "prescribes";
      const sheet = await getGoogleSheet(sheetName);
      await updateRow(sheet, PatientID, {
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
      await updateRow(sheet, PatientID, {
        First_Name: first_name,
        Last_Name: last_name,
        Address: Address,
        Location: Location,
        Age: Age,
        Gender: Gender,
        Phone: Phone,
        PatientID: PatientID,
        PhysicianID: PhysicianID,
        Physician_first_name: Physician_first_name,
        Physician_last_name: Physician_last_name,
        PhysicianNumber: PhysicianNumber,
        Prescription: Prescription,
        Bill: Bill,
        Dose: Dose,
        Visit_Date: Visit_Date,
        Next_Visit: Next_Visit,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

    try {
      const sheetName = "physician";
      const sheet = await getGoogleSheet(sheetName);
      await updateRow(sheet, PatientID, {
        PhysicianID: PhysicianID,
        Physician_first_name: Physician_first_name,
        Physician_last_name: Physician_last_name,
        PhysicianNumber: PhysicianNumber,
        PatientID: PatientID,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
    res.status(200).send("Edit successful");
  };
  editPatient();
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at ${8080}`);
});
