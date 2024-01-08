const { expect } = require("chai");
const sinon = require("sinon");
const { addPatientToDb } = require("../src/crud.js");

describe("Positive Test Case - Add Patient", function () {
  it("should add a patient to the Google Sheet successfully", async function () {
    const mockGetGoogleSheet = sinon.stub().resolves("mocked-sheet");
    const mockAddRowToSheet = sinon.stub().resolves();

    sinon.replace(yourModule, "getGoogleSheet", mockGetGoogleSheet);
    sinon.replace(yourModule, "addRowToSheet", mockAddRowToSheet);

    // Valid patient data
    const validPatientData = {
      PhysicianID: "123",
    };

    // Mock Express response object
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    await addPatientToDb(validPatientData, res);

    // Assertions
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.send.calledOnceWith("Success")).to.be.true;

    // Restore the original functions
    sinon.restore();
  });
});
