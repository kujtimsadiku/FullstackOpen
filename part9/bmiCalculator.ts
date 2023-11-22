interface BMI {
  height: number;
  kg: number;
}

const parseArguments = (args: string[]): BMI => {
  if (args.length < 4) {
    throw new Error("Not too many argmuents");
  } else if (args.length > 4) {
    throw new Error("Too many arguments");
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers.");
  }
};

const bmiCalculator = (height: number, kg: number): string => {
  const heightInMeter = height / 100;

  const bmiValue = kg / (heightInMeter * heightInMeter);

  return `Your BMI value is ${bmiValue}`;
};

try {
  const { height, kg } = parseArguments(process.argv);
  console.log(bmiCalculator(height, kg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
