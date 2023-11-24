interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

function GetRating(rating: number): number {
  switch (true) {
    case rating < 0:
      return 1;
    case rating >= 0 && rating <= 1.3:
      return 2;
    case rating > 1.3:
      return 3;
  }
}

function CalculateResult<T extends number>(time: T[], target: number): Result {
  const zeros: number = time.filter((item) => item === 0).length;
  const averageTime: number =
    time.reduce((previousVal, currentVal) => previousVal + currentVal, 0) /
    time.length;
  const success: boolean = averageTime - target < 0 ? false : true;
  const desc: string = success
    ? "Great job! You reached your target"
    : "You didn't reach to your target";
  const rating = GetRating(averageTime - target);

  const results: Result = {
    periodLength: time.length,
    trainingDays: time.length - zeros ? time.length - zeros : 0,
    target: target,
    average: averageTime,
    success: success,
    rating: rating,
    ratingDescription: desc,
  };

  return results;
}

function ParseArguments(args: string[]): Result {
  if (args.length < 4) {
    throw new Error("Not too many argmuents");
  } else if (isNaN(Number(args[3]))) {
    throw new Error("Target value is not a number.");
  }

  const arrayFromString = JSON.parse(args[2].replace(/'/g, '"'));

  if (arrayFromString.some((item: number) => typeof item !== "number")) {
    throw new Error("From provided values the is not a number.");
  }

  return CalculateResult<number>(arrayFromString, Number(args[3]));
}

try {
  const result = ParseArguments(process.argv);
  console.log(result);
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
