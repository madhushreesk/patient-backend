const { getGoogleSheet, addRowToSheet, updateRow } = require("./helper");

const addPatientToDb = (patient, res) => {
  const {
    PhysicianID,
    PatientID,
    First_Name,
    Last_Name,
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
  } = patient;

  if (!First_Name || !Location || !Age || !Phone) {
    res.status(400).send("Missing required fields");
    return;
  }

  const addPatient = async () => {
    try {
      const sheetName = "patient";
      const sheet = await getGoogleSheet(sheetName);
      await addRowToSheet(sheet, {
        First_Name: First_Name,
        Last_Name: Last_Name,
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
      return res.status(400).send("Error");
    }

    return res.status(200).send("Success");
  };
  addPatient();
};

const editPatientInDb = (patient, res) => {
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
  } = patient;
  const editPatient = async () => {
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
      res.status(400).send(error.message);
    }
    res.status(200).send("Edit successful");
  };
  editPatient();
};

module.exports = {
  addPatientToDb,
  editPatientInDb,
};
