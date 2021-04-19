export type Vector = {
  x: number
  y: number
}

export type IndividualType = {
  order: number[]
  fitness: number
  crossover: () => IndividualType
}

const shuffleArray = (array: number[]): number[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const Individual = (
  initialOrder: number[],
  cities: Vector[]
): IndividualType => {
  const dist = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  const calcDistance = (points: Vector[], order: number[]): number => {
    let totalDistance = 0
    for (let i = 0; i < order.length - 1; i++) {
      const cityAIndex = order[i]
      const cityA = points[cityAIndex]
      const cityBIndex = order[i + 1]
      const cityB = points[cityBIndex]
      const stepDistance = dist(cityA.x, cityA.y, cityB.x, cityB.y)
      totalDistance += stepDistance
    }
    return totalDistance
  }

  const order = initialOrder.slice()
  const fitness = 1 / (calcDistance(cities, order) + 1)

  const crossover = (): IndividualType => {
    let tempChild = order
    const randomOne = Math.floor(Math.random() * order.length)
    const randomTwo = Math.floor(Math.random() * order.length)
    const itemA = tempChild[randomOne]
    const itemB = tempChild[randomTwo]
    tempChild[randomOne] = itemB
    tempChild[randomTwo] = itemA

    return Individual(tempChild, cities)
  }

  return { crossover, fitness, order }
}
