# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Execution plan: 
1. Adding a new table called  `FacilitieAgent` in which there column `externalAgentId` is not null by default and indexed. It will also contain mapping with the `Agents` table and `Facilities`.
3. `getShiftsByFacility` will send both Custom Agent Id and Internal Id back in response. In an Ideal scenario the internal id
should not be sent to the user we must use a randomly generated id.
4. `generateReport` will also have both Custom Agent Id and AgentId. The reason is Custom id is optional and all Facilities might not need it.

### Ticket 1: Write the test for existing Functionality

If the test for existing code doesn't exist then write the test for existing functionality. Which ensures that nothing else breaks in that function other than what we want to break. 

#### Acceptance Criteria
1. Unit test cases for the existing functions should be added.
2. Proper auditing of code must be done to make sure what all will break.

#### Effort Estimation
  - 4 hours of work (including unit test case writing and auditing)

### Ticket 2: Ability for Facilities to add Custom Agent Id while creating shifts if doesn't exist.

Description: Facilities will add a new Custom Agent Id for every new Agent which is optional. We save mapping of Facilities with Agent in the table called  FacilitieAgent with Custom Agent Id if Custom Agent Id is provided.

#### Acceptance Criteria
1. All changes should be backward compatible with the database as migration of data is not required.
2. Proper test to be written for function which creates and fetches Custom Agent Id.

#### Effort Estimation
  - 12 hours of work (including unit test case writing and database updation)

#### Implementation
1. Create a new database `FacilitieAgent` table.
2. Create the functions to get and create Custom Agent Id(`externalAgentId`). 
3. Fix existing tests before moving on. Add new tests to ensure the creation of entries in the `FacilitieAgent` table.

### Ticket 3: Updating getShiftsByFacility function.

Description: `getShiftsByFacility` function will be updated so that we get both Agent Id and Agent Custom Id in shift data.

#### Acceptance Criteria
1. Existing test for `getShiftsByFacility` should pass with updation Agent Custom in is shifts data.
2. Proper test to be written for function fetches Custom Agent Id.

#### Effort Estimation
  - 3 hours work (including updation for function and unit test case writing)

#### Implementation
1. Update the `getShiftsByFacility` function to get both Agent Id and Agent Custom Id in data.
2. Create a function to fetch  Custom Agent Id(`externalAgentId`) from  FacilitieAgent. 
3. Fix existing tests before moving on. Add tests to ensure  Agent Custom Id is the same as provided by Facilities

### Ticket 4: Updating generateReport function.

Description: `generateReport` function will be updated so that we get both Agent Id and Agent Custom Id in the pdf which is printed.

#### Acceptance Criteria
1. Existing test for `generateReport` should pass with updation Agent Custom Id in data.

#### Effort Estimation
  - 2 hours work (including updation for function and unit test case writing)

#### Implementation
1. Update `generateReport` function to get both Agent Id and Agent Custom Id in pdf.
2. Fix existing tests before moving on. Add tests to ensure  Agent Custom Id is same as provided by Facilities
