interface BMI {
  height: number;
  kg: number;
}

const parseArguments = (args: string[]): BMI => {
  console.log(args.length);
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
      return `Underweight (Severe thinness)`;
    case bmiValue < 16.9:
      return `Underweight (Moderate thinness)`;
    case bmiValue < 18.4:
      return `Underweight (Mild thinness)`;
    case bmiValue < 24.9:
      return `Normal range`;
    case bmiValue < 29.9:
      return `Overweight (Pre-obese)`;
    case bmiValue < 34.9:
      return `Obese (Class I)`;
    case bmiValue < 39.9:
      return `Obese (Class II)`;
    default:
      return `Obese (Class III)`;
  }
};

export const calculateBmi = (height: number, kg: number): string => {
  const heightInMeter = height / 100;

  const bmiValue = kg / (heightInMeter * heightInMeter);

  return BmiCategory(bmiValue);
};

if (require.main === module) {
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
}
