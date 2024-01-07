export const removeAfterLastDot = (inputString: string) => {
  const lastDotIndex = inputString.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    return inputString.substring(0, lastDotIndex)
  } else {
    return inputString
  }
}
