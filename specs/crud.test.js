const { expect } = require("chai");
const yourModule = require("./yourFile"); // Replace with the actual file path

// Mock getGoogleSheet function
const mockGetGoogleSheet = async () => "mocked-sheet";
// Mock addRowToSheet function
const mockAddRowToSheet = async (sheet, data) => {
  // Do nothing for the mock, as we are not testing the actual Google Sheet interactions here
};

// Replace the real functions with mocks
yourModule.getGoogleSheet = mockGetGoogleSheet;
yourModule.addRowToSheet = mockAddRowToSheet;

describe("Positive Test Case - Add Patient", function () {
  it("should add a patient to the Google Sheet successfully", async function () {
    // Valid patient data
    const validPatientData = {
      PhysicianID: "123",
      // ... other patient data ...
    };

    // Mock Express response object
    const res = {
      status: (status) => ({
        send: (message) => {
          // Assertions
          expect(status).to.equal(200);
          expect(message).to.equal("Success");
        },
      }),
    };

    // Call the function with the test data
    await yourModule.addPatientToDb(validPatientData, res);
  });
});
