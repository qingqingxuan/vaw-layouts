export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function toggleThemeColorClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

export function toggleThemeClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') !== -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str) {
  if (!str) return str
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}
