// myClass.test.js
const MyClass = require("../src/myClass.js");
const { expect } = require("chai");

const myObj = new MyClass();

describe("Test suite", function () {
  it("Test the add method", function () {
    expect(myObj.add(1, 2)).to.equal(3);
  });
});
