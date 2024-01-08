const dbKeys = [
  "First_Name",
  "Last_Name",
  "Address",
  "Location",
  "Age",
  "Gender",
  "Phone",
  "PatientID",
  "PhysicianID",
  "Physician_first_name",
  "Physician_last_name",
  "PhysicianNumber",
  "Prescription",
  "Bill",
  "Dose",
  "Visit_Date",
  "Next_Visit",
];
const RESPONSES_SHEET_ID = "1eqfstDJns9feBFN7rW5pCKlHqg4yzhkryCa78_kM9Qs";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

module.exports = {
  dbKeys,
  RESPONSES_SHEET_ID,
  SCOPES,
};
