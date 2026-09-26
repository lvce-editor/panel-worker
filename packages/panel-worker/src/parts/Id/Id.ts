const idState = {
  counter: 0,
}

export const create = (): number => {
  idState.counter++
  return idState.counter
}
