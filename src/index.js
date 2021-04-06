/**
 *
 * @param {any[]} items
 * @return {number[]}
 */
export const filterNumbers = (items) => {
  return items.map(item => Number(item)).filter(item => !isNaN(item))
}

/**
 * Calculate sum of key values within an object array.
 *
 * @param {any[]} - items
 * @param {string} - key
 * @return {number}
 */
export const keySum = (items, key) => {
  return filterNumbers(items.map(item => item[key]))
    .reduce((acc, cur) => cur + acc, 0)
}

/**
 * Calculate the average of key values within an object array.
 *
 * @param {any[]} - items
 * @param {string} - key
 * @return {number}
 */
export const keyAvg = (items, key) => {
  return keySum(items, key) / items.length
}

/**
 *
 * @param {any[]} items
 * @return {number}
 */
 export const numMin = (items) => {
  const numbers = filterNumbers(items)
  return Math.min(...numbers)
}

/**
 *
 * @param {any[]} items
 * @return {number}
 */
export const numMax = (items) => {
  const numbers = filterNumbers(items)
  return Math.max(...numbers)
}

/**
 * Sum method that can handle converting items to numbers, and also filtering
 * out NaN values from sum calculation.
 *
 * @param {any[]} items
 * @param {number} offset
 * @return {number}
 */
 export const sum = (items, offset = 0) => {
  return filterNumbers(items).reduce((acc, cur) => cur + acc, offset)
}

/**
 *
 * @param {any[]} items
 * @param {number} offset
 * @return {number}
 */
export const sumAvg = (items, offset = 0) => {
  return sum(items, offset) / items.length
}

/**
 * Calculate the average of values that fall within a specific range.
 *
 * @param {any[]} items
 * @param {number} rangeMin
 * @param {number} rangeMax
 * @return {number}
 */
export const rangeAvg = (items, rangeMin = 0, rangeMax = 1) => {
  const minNum = numMin(items)
  const maxNum = numMax(items)

  const rangeDiff = maxNum - minNum
  const rangeFloor = minNum + (rangeDiff * rangeMin)
  const rangeCeil = minNum + (rangeDiff * rangeMax)

  const rangeNums = items.filter(item => item >= rangeFloor && item <= rangeCeil)

  return sumAvg(rangeNums)
}

export const within = (value, target, offset = 0) => {
  return (value >= target - offset) &&
    (value <= target + offset)
}

export const outside = (value, target, offset = 0) => {
  return (value < (target - offset)) ||
    (value > target + offset)
}

/**
 *
 * @param {number} value
 * @return {number}
 */
export const degrees = (value) => {
  return value * (180 / Math.PI)
}

/**
 *
 * @param {number} value
 * @return {number}
 */
export const radians = (value) => {
  return value * (Math.PI / 180)
}

const DEFAULT_POINT = { x: 0, y: 0 }

/**
 *
 * @param {{ x: number, y: number }} pointA
 * @param {{ x: number, y: number }} pointB
 * @param {{ x: number, y: number }} pointC
 * @return {number}
 */
export const angle = (
  pointA = DEFAULT_POINT,
  pointB = DEFAULT_POINT,
  pointC = DEFAULT_POINT,
) => {
  // Law of cosines
  const seg1 = Math.sqrt(
    Math.pow(((pointA.x) - (pointB.x)), 2) +
    Math.pow(((pointA.y) - (pointB.y)), 2)
  )
  const seg2 = Math.sqrt(
    Math.pow(((pointA.x) - (pointC.x)), 2) +
    Math.pow(((pointA.y) - (pointC.y)), 2)
  )
  const seg3 = Math.sqrt(
    Math.pow(((pointB.x) - (pointC.x)), 2) +
    Math.pow(((pointB.y) - (pointC.y)), 2)
  )
  const numerator = (Math.pow(seg1, 2) + Math.pow(seg3, 2)) - Math.pow(seg2, 2)
  const denominator = (2 * seg1 * seg3)

  return degrees(Math.acos(numerator / denominator))
}

/**
 *
 * @param {number} distance
 * @param {number} time
 * @returns
 */
export const velocity = (distance, time) => distance / time
