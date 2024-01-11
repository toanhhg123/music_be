export const removeAfterLastDot = (inputString: string) => {
  const lastDotIndex = inputString.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    return inputString.substring(0, lastDotIndex)
  } else {
    return inputString
  }
}

export function autoBind(instance: any): void {
  const prototype = Object.getPrototypeOf(instance)
  console.log(instance)
  Object.getOwnPropertyNames(prototype)
    .filter((name) => typeof instance[name] === 'function')
    .forEach((name) => {
      console.log(name)
      instance[name] = instance[name].bind(instance)
    })
}
