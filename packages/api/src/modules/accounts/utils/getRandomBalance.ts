const getRandomFloat = (max: number, min: number): number => {
  return Math.random() * (max - min + 1) + min
}

export const getRandomBalance = () => {
  const balance = getRandomFloat(100, 0)
  const availableBalance = getRandomFloat(balance, 0)

  return {
    balance,
    availableBalance
  }
}