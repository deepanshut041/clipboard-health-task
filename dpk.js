const crypto = require("crypto");

// I like to keep constant at the top as they can be exported and reused
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Code to generate hash was repeated at 2 places so I created this common function. 
// In future, if we want to change hashing it would be easier and safer
const generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}


exports.deterministicPartitionKey = (event) => {
  // It ensures that the function returns the default value if the event parameter is null
  // It also saves us from getting an internal error because it stops further execution of the function
  if (!event) return TRIVIAL_PARTITION_KEY;

  // I changed if and else to the ternary operator it make function more compact and readable
  // Removed 'data' as it is only used at one place and nowhere else.
  let candidate = event.partitionKey ? event.partitionKey : generateHash(JSON.stringify(event))

  // Removed unnecessary if from code as we know that value of candidate can't be null.
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHash(candidate);
  }
  
  return candidate;
};