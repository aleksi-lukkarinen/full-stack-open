const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const bmi = weightInKg / Math.pow(heightInCm / 100.0, 2)

  const textualClass =
      bmi < 18.5 ? "Underweight"
    : bmi < 25   ? "Normal (healthy weight)"
    : bmi < 30   ? "Overweight"
    : "Obese"

  return textualClass
}


console.log(calculateBmi(180, 70))
