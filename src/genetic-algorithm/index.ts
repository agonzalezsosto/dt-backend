import Individual, { IndividualType } from './individual'

export type GeneticAlgorithmType = {
  calculateNewGeneration: () => void
  getFittest: () => string
}

const GeneticAlgorithm = (): GeneticAlgorithmType => {
  const populationSize = 100
  const target = 'depart transcend'
  const dnaSize = target.length
  let population: IndividualType[] = []

  for (let i = 0; i < populationSize; i++) {
    let tempString = ''
    for (let j = 0; j < dnaSize; j++) {
      tempString += String.fromCharCode(32 + Math.floor(Math.random() * 95))
    }
    const tempIndividual = Individual(tempString, target)
    population.push(tempIndividual)
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

    const matingPool = population.filter(ind => ind.fitness !== 0)
    const temp: IndividualType[] = []

    for (let i = 0; i < population.length; i++) {
      const parentA = pickOne(matingPool)
      const parentB = pickOne(matingPool)
      const child = parentA.crossover(parentB)
      temp.push(child)
    }
    population = temp
    population.forEach(pop => {
      pop.randomMutation()
    })
  }

  const getFittest = (): string => {
    let highestFitness = 0
    let currentFittest = ''
    for (let i = 0; i < population.length; i++) {
      if (population[i].fitness > highestFitness) {
        highestFitness = population[i].fitness
        currentFittest = population[i].value
      }
    }
    return currentFittest
  }

  return {
    calculateNewGeneration,
    getFittest
  }
}

export default GeneticAlgorithm
