import province from 'province-city-china/dist/province.json'
import area from 'province-city-china/dist/area.json'
import level from 'province-city-china/dist/level.json'

export function getProvinceByCode(code: string) {
  code = code.toString()
  const provinceCode = code.substring(0, 2)
  if (provinceCode == '10') return '未知'
  const result = province.find((obj) => {
    return obj.province == provinceCode
  })
  return result ? result.name : code
}

export function getAreaByCode(code: string) {
  code = code.toString()
  const result = area.find((obj) => {
    return obj.code == code
  })
  return result ? result.name : code
}

export function getLocation(code: string) {
  code = code.toString()

  const provinceCode = code.substring(0, 2) + '0000'
  const provinceResult = level.find((obj) => {
    return obj.code == provinceCode
  })
  if (!provinceResult) return '未知'
  var provinceName = provinceResult.name

  if (/11|31|12|50/.test(provinceResult.province)) {
    //四个直辖市 北京:11, 上海:31，天津:12，重庆市:50
    const areaResult = provinceResult.children.find((obj) => {
      return obj.code == code
    })
    if (!areaResult) return provinceName
    var areaName = areaResult.name

    return provinceName + areaName
  } else {
    //其他城市
    const cityCode = code.substring(0, 4) + '00'
    const cityResult = provinceResult.children.find((obj) => {
      return obj.code == cityCode
    })
    if (!cityResult) return provinceName
    var cityName = cityResult.name

    return provinceName + cityName
  }
}
