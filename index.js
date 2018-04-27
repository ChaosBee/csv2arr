/**
 * csv file to 2D arr
 * */
import Papa from 'papaparse'
import Jschardet from 'jschardet/dist/jschardet'

console.log(Papa)
console.log(Jschardet)
function checkEncoding (base64Str) {
  // get binary string
  var str = atob(base64Str.split(';base64,')[1])
  console.log(str)
  var encoding = Jschardet.detect(str)
  console.log(encoding)
  encoding = encoding.encoding

  // 有时会识别错误（如UTF8的中文二字）
  if (encoding === 'windows-1252') {
    encoding = 'ANSI'
  }
  return encoding
}

export default function (file) {
  return new Promise((resolve, reject) => {
    if (typeof FileReader === 'undefined') {
      console.warn(
        'IE9及以下浏览器不支持，请使用Chrome或Firefox浏览器\nYour browser is too old,please use Chrome or Firefox'
      )
      return false
    }
    var fReader = new FileReader()
    fReader.readAsDataURL(file)
    fReader.onload = function (e) {
      var data = e.target.result
      var encoding = checkEncoding(data)
      Papa.parse(file, {
        encoding: encoding,
        complete: function (results) {
          // UTF8 \r\n与\n混用时有可能会出问题
          console.log(results)
          var res = results.data
          if (res[res.length - 1] === '') {
            // 去除最后的空行
            res.pop()
          }
          resolve(res)
        }
      })
    }
    fReader.onerror = function (evt) {
      console.warn(
        '文件已修改，请重新选择(Firefox)\nThe file has changed,please select again.(Firefox)'
      )
      reject(evt)
    }
  })
}
