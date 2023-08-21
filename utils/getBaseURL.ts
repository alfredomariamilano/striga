export const getBaseURL = () => {
  return typeof process !== 'undefined'
    ? process.env.URL
    : 'http://localhost:3000'
}
