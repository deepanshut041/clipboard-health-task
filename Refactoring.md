# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
- I moved constants to the top of the file because I like to keep constants at the top as they can be exported and reused
- Made a common function to generate hash because Code to generate hash was repeated at 2 places so I created this common function in the future, if we want to change hashing it would be easier and safer.
- Added a null check for event value because It ensures that the function returns the default value if the event parameter is null and it also saves us from getting an internal error because it stops further execution of the function.
- Removed the 'data' variable because it is only used at one place and nowhere else.
- Changed if and else to the ternary operator for 'candidate' value initialization as it makes the function more compact and readable.
- Removed unnecessary if from code where we check the data type of candidate as we know that value of candidate can't be null.