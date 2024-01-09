const { dbKeys, RESPONSES_SHEET_ID, SCOPES } = require("./constants");
const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

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

const jwt = new JWT({
  email: CREDENTIALS.client_email,
  key: CREDENTIALS.private_key,
  scopes: SCOPES,
});

const sheetTitle = { appointment: 0, prescribes: 1, patient: 2, physician: 3 };

const createPatientObject = (keys, values) => {
  const patientObject = {};

  keys.forEach((key, index) => {
    patientObject[key] = values[index];
  });

  return patientObject;
};

const updateRow = async (sheet, PatientID, updatedData) => {
  const row = await findRow(sheet, PatientID);
  row.assign(updatedData);
  await row.save();
};

const addRowToSheet = async (sheet, data) => {
  await sheet.addRow(data);
};

const getAllRows = async (sheet) => {
  const allRows = await sheet.getRows();

  const rowsArr = [];
  allRows.forEach((row) =>
    rowsArr.push(createPatientObject(dbKeys, row._rawData))
  );
  return rowsArr;
};

const findRow = async (sheet, PatientID) => {
  const rows = await sheet.getRows();
  const row = rows.find((row) => row.get("PatientID") === PatientID);
  return row;
};

const getGoogleSheet = async (sheetName) => {
  try {
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[sheetTitle[sheetName]];
    return sheet;
  } catch (error) {
    console.log("sheet not found", error.message);
  }
};

const findRowByQuery = async (sheet, searchQuery) => {
  const allRows = await sheet.getRows();
  const searchQueryLowerCase = searchQuery.toLowerCase();
  const resultRows = allRows.filter((row) => {
    return (
      row.get("PatientID").toLowerCase().includes(searchQueryLowerCase) ||
      row.get("Last_Name").toLowerCase().includes(searchQueryLowerCase) ||
      row.get("First_Name").toLowerCase().includes(searchQueryLowerCase) ||
      row.get("Phone").toLowerCase().includes(searchQueryLowerCase) ||
      row.get("Location").toLowerCase().includes(searchQueryLowerCase) ||
      row.get("Address").toLowerCase().includes(searchQueryLowerCase)
    );
  });
  const rowsArr = [];
  resultRows.forEach((row) =>
    rowsArr.push(createPatientObject(dbKeys, row._rawData))
  );
  return rowsArr;
};

module.exports = {
  createPatientObject,
  addRowToSheet,
  findRow,
  getGoogleSheet,
  getAllRows,
  updateRow,
  findRowByQuery,
};
