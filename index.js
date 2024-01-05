const express = require("express");
const {
  getGoogleSheet,
  addRowToSheet,
  printAllRows,
  findRow,
  updateRow,
  deleteRow,
} = require("./Drive");

const app = express();

const main = async () => {
  try {
    const sheetName = "appointment";
    const sheet = await getGoogleSheet(sheetName);

    await addRowToSheet(sheet, {
      AppointmentID: "123",
      PatientID: "s v road belgaum",
      PhysicianID: "belgaum",
      visit_date: 22,
      next_date: "female",
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }

  try {
    const sheetName = "patient";
    const sheet = await getGoogleSheet(sheetName);
    await addRowToSheet(sheet, {
      name: "Madhushri kulkarni",
      Address: "s v road belgaum",
      Location: "belgaum",
      Age: 22,
      Gender: "female",
      Phone: "12345",
    });
  } catch (error) {
    console.log("error occured in main");
    console.error("An error occurred:", error.message);
  }

  try {
    const sheetName = "patient";
    const sheet = await getGoogleSheet(sheetName);
    await addRowToSheet(sheet, {
      name: "Madhushri kulkarni",
      Address: "s v road belgaum",
      Location: "belgaum",
      Age: 22,
      Gender: "female",
      Phone: "12345",
    });
  } catch (error) {
    console.log("error occured in main");
    console.error("An error occurred:", error.message);
  }

  try {
    const sheetName = "patient";
    const sheet = await getGoogleSheet(sheetName);
    await addRowToSheet(sheet, {
      name: "Madhushri kulkarni",
      Address: "s v road belgaum",
      Location: "belgaum",
      Age: 22,
      Gender: "female",
      Phone: "12345",
    });
  } catch (error) {
    console.log("error occured in main");
    console.error("An error occurred:", error.message);
  }
};

main();

app.use(express.json());

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
