export const CLI_ARGS: string[] = []

for (let i:number=2; i<process.argv.length; i++) {
  CLI_ARGS.push(process.argv[i])
}

export const NUM_CLI_ARGS: number = CLI_ARGS.length

export const errorExit = (message: string) => {
  console.log(message);
  process.exit(1);
}

export const readNonNegativeFloat = (s: string, errMsg: string): number => {
  let n: number = -999

  try {
    n = Number.parseFloat(s);
  }
  catch (e) {
    errorExit(`Error: ${e.name}: ${e.message}`)
  }

  if (Number.isNaN(n) || n < 0) {
    errorExit(errMsg)
  }

  return n
}
