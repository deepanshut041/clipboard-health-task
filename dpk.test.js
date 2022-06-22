const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("When 'partitionKey' is not passed in the event, it returns the hash of the event object back", () => {
    const event = { pKey: "Sample Data" };
    const trivialKey = deterministicPartitionKey(event);
    const expectedTrivialKey = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")

    expect(trivialKey).toBe(expectedTrivialKey);
  })

  it("When 'partitionKey' is passed in the event, and it's datatype is String and length is smaller than 256", () => {
    const event = { partitionKey: "Sample Data" };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(event.partitionKey);
  })

  it("When 'partitionKey' is passed in the event, and it's datatype is String and length is greater than 256", () => {
    let partitionKey = ""
    for (let i = 0; i < 50; i++) {
      partitionKey += "Random String"
    }
    const event = { partitionKey: partitionKey };
    const trivialKey = deterministicPartitionKey(event);
    const expectedTrivialKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");

    expect(trivialKey).toBe(expectedTrivialKey);
  })

  it("When 'partitionKey' is passed in the event, and it's datatype is not String", () => {
    const event = { partitionKey: 838737363 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toEqual(JSON.stringify(event.partitionKey));
  })

});