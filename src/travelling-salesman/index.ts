import { Vector, IndividualType, Individual } from './individual'

const shuffleArray = (array: number[]): number[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export type TravellingSalesmanType = {
  calculateNewGeneration: () => void
  getCitiesAndFittestOrder: () => { currentFittest: number[]; cities: Vector[] }
}

const TravellingSalesman = (): TravellingSalesmanType => {
  const numPoints = 20
  const populationSize = 100
  const cities: Vector[] = []
  const order: number[] = []
  let population: IndividualType[] = []

  for (let i = 0; i < numPoints; i++) {
    cities.push({ x: Math.random(), y: Math.random() })
    order.push(i)
  }

  for (let i = 0; i < populationSize; i++) {
    population.push(Individual(shuffleArray(order), cities))
  }

  const calculateNewGeneration = () => {
    let totalFitness = 0
    for (let i = 0; i < populationSize; i++) {
      totalFitness += population[i].fitness
    }

    const pickOne = (pop: IndividualType[]) => {
      let index = 0
      let r = Math.random() * totalFitness

      while (r > 0) {
        r -= pop[index].fitness
        index++
      }
      index--
      return pop[index]
    }

    const matingPool = population.filter(ind => ind.fitness > 0.02)
    const temp: IndividualType[] = []

    if (matingPool.length > 0) {
      for (let i = 0; i < population.length; i++) {
        const parentA = pickOne(matingPool)
        const child = parentA.crossover()
        temp.push(child)
      }
    } else {
      for (let i = 0; i < population.length; i++) {
        temp.push(Individual(shuffleArray(order), cities))
      }
    }

    population = temp
  }

  const getCitiesAndFittestOrder = (): {
    currentFittest: number[]
    cities: Vector[]
  } => {
    let highestFitness = 0
    let currentFittest: number[]
    for (let i = 0; i < population.length; i++) {
      if (population[i].fitness > highestFitness) {
        highestFitness = population[i].fitness
        currentFittest = population[i].order
      }
    }
    return { currentFittest, cities }
  }

  return {
    calculateNewGeneration,
    getCitiesAndFittestOrder
  }
}

export default TravellingSalesman
