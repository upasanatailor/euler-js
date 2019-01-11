const chalk = require("chalk");

module.exports = ({ verbose }) => {
  console.log(chalk.cyan.bold("\nProblem #1: Multiples of 3 and 5"));

  const multiplesOf = n => {
    const multiples = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (let i = 1; i * n < 1000; i++) multiples.push(i * n);

    const sumOfMultiples = multiples.reduce(reducer);
    if (verbose) {
      console.log(
        chalk.yellow(`Sum of multiples of ${n}:`),
        chalk.yellow.bold(sumOfMultiples)
      );
    }
    return sumOfMultiples;
  };

  const result = multiplesOf(3) + multiplesOf(5) - multiplesOf(15);
  console.log(chalk.green(`Solution: ${result}`));
  return result;
};
