const calcPrize = (old) => {
  const { total = 0 } = old
  const matchFirstTwo = total * 0.08
  const matchFirstThree = total * 0.12
  const matchAll = total * 0.5
  const rollOver = total * 0.15
  const burn = total * 0.15
  return {
    total,
    matchFirstTwo,
    matchFirstThree,
    matchAll,
    rollOver,
    burn,
  }
}

export default calcPrize
