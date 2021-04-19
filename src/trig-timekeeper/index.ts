const TrigTimekeeper = () => {
  let counter = 0
  let sinValOne = 0
  let sinValTwo = 0
  let cosValOne = 0
  let offset = 0

  const addOffsetOne = () => {
    offset += 0.5
  }

  const addOffsetTwo = () => {
    offset += 0.25
  }

  const addOffsetThree = () => {
    offset += 0.05
  }

  const step = () => {
    counter = counter + 0.01
    sinValOne = Math.sin(counter)
    cosValOne = Math.cos(counter + offset)
    sinValTwo = Math.sin(counter / 2) * 0.5 + 0.5
  }

  const getValues = () => {
    return { sinValOne, cosValOne, counter, sinValTwo }
  }

  return { step, getValues, addOffsetOne, addOffsetTwo, addOffsetThree }
}

export default TrigTimekeeper
