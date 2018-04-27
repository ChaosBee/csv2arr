(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('papaparse'), require('jschardet/dist/jschardet')) :
  typeof define === 'function' && define.amd ? define(['papaparse', 'jschardet/dist/jschardet'], factory) :
  (global.csv2arr = factory(global.Papa,null));
}(this, (function (Papa,Jschardet) { 'use strict';

  Papa = Papa && Papa.hasOwnProperty('default') ? Papa['default'] : Papa;
  Jschardet = Jschardet && Jschardet.hasOwnProperty('default') ? Jschardet['default'] : Jschardet;

  console.log(Papa);
  console.log(Jschardet);
  function checkEncoding(base64Str) {
    var str = atob(base64Str.split(';base64,')[1]);
    console.log(str);
    var encoding = Jschardet.detect(str);
    console.log(encoding);
    encoding = encoding.encoding;

    if (encoding === 'windows-1252') {
      encoding = 'ANSI';
    }
    return encoding;
  }

  function index (file) {
    return new Promise(function (resolve, reject) {
      if (typeof FileReader === 'undefined') {
        console.warn('IE9及以下浏览器不支持，请使用Chrome或Firefox浏览器\nYour browser is too old,please use Chrome or Firefox');
        return false;
      }
      var fReader = new FileReader();
      fReader.readAsDataURL(file);
      fReader.onload = function (e) {
        var data = e.target.result;
        var encoding = checkEncoding(data);
        Papa.parse(file, {
          encoding: encoding,
          complete: function complete(results) {
            console.log(results);
            var res = results.data;
            if (res[res.length - 1] === '') {
              res.pop();
            }
            resolve(res);
          }
        });
      };
      fReader.onerror = function (evt) {
        console.warn('文件已修改，请重新选择(Firefox)\nThe file has changed,please select again.(Firefox)');
        reject(evt);
      };
    });
  }

  return index;

})));
