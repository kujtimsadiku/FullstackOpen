interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) {
    throw new Error("Not too many argmuents");
  }

  for (let i = 2; i < args.length - 1; i++) {
    if (!isNaN(Number(args[i]))) {
      throw new Error("From provided values the is not a number.");
    }
  }
};

// const calculateExercise = (arg): Result => {

// }

try {
  const result = parseArg;
} catch (error) {}
