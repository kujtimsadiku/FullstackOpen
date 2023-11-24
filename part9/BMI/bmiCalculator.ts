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

const BmiCategory = (bmiValue: number): string => {
  switch (true) {
    case bmiValue < 16.0:
      return `Your BMI value: ${bmiValue}\n\nCategory: Underweight (Severe thinness)`;
    case bmiValue < 16.9:
      return `Your BMI value: ${bmiValue}\n\nCategory: Underweight (Moderate thinness)`;
    case bmiValue < 18.4:
      return `Your BMI value: ${bmiValue}\n\nCategory: Underweight (Mild thinness)`;
    case bmiValue < 24.9:
      return `Your BMI value: ${bmiValue}\n\nCategory: Normal range`;
    case bmiValue < 29.9:
      return `Your BMI value: ${bmiValue}\n\nCategory: Overweight (Pre-obese)`;
    case bmiValue < 34.9:
      return `Your BMI value: ${bmiValue}\n\nCategory: Obese (Class I)`;
    case bmiValue < 39.9:
      return `Your BMI value: ${bmiValue}\n\nCategory: Obese (Class II)`;
    default:
      return `Your BMI value: ${bmiValue}\n\nCategory: Obese (Class III)`;
  }
};

const calculateBmi = (height: number, kg: number): string => {
  const heightInMeter = height / 100;

  const bmiValue = kg / (heightInMeter * heightInMeter);

  switch (bmiValue) {
  }

  return BmiCategory(bmiValue);
  // return `Your BMI value is ${bmiValue}`;
};

try {
  const { height, kg } = parseArguments(process.argv);
  console.log(calculateBmi(height, kg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
