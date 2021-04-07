export type IndividualType = {
  value: string
  fitness: number
  randomMutation: () => void
  crossover: (otherParent: IndividualType) => IndividualType
}

const Individual = (
  initialValue: string,
  initialTarget: string
): IndividualType => {
  let value = initialValue
  const valueArray = initialValue.split('')
  const targetValueArray = initialTarget.split('')

  const calculateFitness = () => {
    let count = 0

    for (let i = 0; i < valueArray.length; i++) {
      if (valueArray[i] === targetValueArray[i]) {
        count++
      }
    }

    return count / valueArray.length
  }

  const fitness = calculateFitness()

  const crossover = (otherParent: IndividualType): IndividualType => {
    const midpoint = Math.floor(Math.random() * valueArray.length)
    let tempChild = []
    for (let i = 0; i < valueArray.length; i++) {
      if (i < midpoint) {
        tempChild[i] = valueArray[i]
      } else {
        tempChild[i] = otherParent.value.split('')[i]
      }
    }
    return Individual(tempChild.join(''), initialTarget)
  }

  const randomMutation = () => {
    const randRate = 0.25
    const r = Math.random()

    for (let i = 0; i < valueArray.length; i++) {
      if (r < randRate) {
        const randChar = String.fromCharCode(
          65 + Math.floor(Math.random() * 57)
        )
        valueArray[i] = randChar
      }
    }
    value = valueArray.join('')
  }

  return {
    fitness,
    randomMutation,
    crossover,
    value
  }
}

export default Individual
