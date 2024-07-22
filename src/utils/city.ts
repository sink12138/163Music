import city from 'province-city-china/dist/city.json'

export function getCityByCode(code: string) {
  const result = city.find((obj) => {
    return obj.code === code
  })
  return result ? result.name : code
}
