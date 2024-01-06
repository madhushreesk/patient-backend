const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

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

// Google sheet npm package

// File handling package
const fs = require("fs");

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];
const jwt = new JWT({
  email: CREDENTIALS.client_email,
  key: CREDENTIALS.private_key,
  scopes: SCOPES,
});

const RESPONSES_SHEET_ID = "1eqfstDJns9feBFN7rW5pCKlHqg4yzhkryCa78_kM9Qs";

// Create a new document

const sheetTitle = { appointment: 0, prescribes: 1, patient: 2, physician: 3 };
const getGoogleSheet = async (sheetName) => {
  const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, jwt);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[sheetTitle[sheetName]];

  return sheet;
};

const getRowsFromAllSheets = async () => {
  const allData = [];
  const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, jwt);

  await doc.loadInfo();

  for (const title of Object.keys(sheetTitle)) {
    const sheetIndex = sheetTitle[title];
    let sheet = doc.sheetsByIndex[sheetIndex];

    // Get all the rows
    let rows = await sheet.getRows();
    rows.forEach((row, index) => {
      const rowData = row._rawData;
      if (!allData[index]) {
        allData[index] = [...rowData];
      } else allData[index].push(...rowData);
    });
  }
  return allData;
};

// getRowsFromAllSheets();

const addRowToSheet = async (sheet, data) => {
  await sheet.addRow(data);
};

const findRow = async (sheet, PatientID) => {
  const rows = await sheet.getRows();
  const row = rows.find((row) => row.get("PatientID") === PatientID);
  return row;
};

const updateRow = async (sheet, PatientID, updatedData) => {
  // console.log(PatientID);
  const row = await findRow(sheet, PatientID);
  row.assign(updatedData);
  await row.save();
};

const addRow = async (rows) => {
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await doc.loadInfo();

  // Index of the sheet
  let sheet = doc.sheetsByIndex[0];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    await sheet.addRow(row);
  }
};

let rows = [
  {
    first_name: "test",
    last_name: "works",
    Location: "Delhi",
    Age: "22",
    Phone: "123456",
    Gender: "F",
    Address: "lorem ipsum",
    Prescription: "hcsj xsbjk bjdks",
    Dose: "dolo",
    Physician_first_name: "qwerty",
    Physician_last_name: "poiuyt",
    Physician_Number: "098765",
    Bill: "500",
    Next_Visit: "22-3-2022",
    Physician_ID: "phy12",
    Patient_ID: "pat02",
    Visit_Date: "12-3-2022",
  },
  {
    email: "email@gmail.com",
    user_name: "dilip",
    password: "abcd@1234",
  },
];

// addRow(rows);

// updateRow('email', 'email@gmail.com', 'ramesh@ramesh.com')

const deleteRow = async (keyValue, thisValue) => {
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await doc.loadInfo();

  // Index of the sheet
  let sheet = doc.sheetsByIndex[0];

  let rows = await sheet.getRows();

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (row[keyValue] === thisValue) {
      await rows[index].delete();
      break;
    }
  }
};

module.exports = {
  getGoogleSheet,
  addRowToSheet,
  findRow,
  updateRow,
};
