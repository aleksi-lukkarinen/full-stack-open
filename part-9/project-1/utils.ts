export const errorExit = (message: string) => {
  console.log(message);
  process.exit(1);
};

export const readNonNegativeFloat =
  (s: string, errMsg: string): number => {

  let n: number = Number.NaN;

  try {
    n = Number.parseFloat(s);
  }
  catch (e) {
    let message = "An unknown error occurred";
    if (e instanceof Error) {
      message = `Error: ${e.name}: ${e.message}`;
    }
    throw new Error(message);
  }

  if (Number.isNaN(n) || n < 0) {
    throw new Error(errMsg);
  }

  return n;
};
