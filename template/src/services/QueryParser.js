const getQueryParam = function(searchStr, key) {
  let queryStr

  if (searchStr.startsWith('?')) {
    queryStr = searchStr.substring(1)
  } else {
    queryStr = searchStr
  }

  const codeMatch = queryStr.match(new RegExp(`${key}=([^&=]*)`))
  return codeMatch && codeMatch[1]
}

export {
  getQueryParam
}
