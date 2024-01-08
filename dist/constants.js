"use strict";

var dbKeys = [
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
var RESPONSES_SHEET_ID = "1eqfstDJns9feBFN7rW5pCKlHqg4yzhkryCa78_kM9Qs";
var SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];
module.exports = {
  dbKeys: dbKeys,
  RESPONSES_SHEET_ID: RESPONSES_SHEET_ID,
  SCOPES: SCOPES,
};
