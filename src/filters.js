module.exports = {
  datetimeparse: (timestamp, format) => {
    console.log(timestamp, format)
    let newtimestamp = timestamp
      ? timestamp.length == 13
        ? timestamp
        : timestamp.length == 10
          ? timestamp + '000'
          : null
      : null
    let dateobj = new Date(newtimestamp ? parseInt(newtimestamp) : null)
    let YYYY = dateobj.getFullYear()
    let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
    let DD = dateobj.getDate() > 9 ? dateobj.getDate() > 9 : '0' + dateobj.getDate()
    let HH = dateobj.getHours()
    let mm = dateobj.getMinutes()
    let ss = dateobj.getSeconds()
    let output = '';
    let separator = '/'
    if (format) {
      separator = format.match(/-/) ? '-' : '/'
      output += format.match(/yy/i) ? YYYY : ''
      output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
      output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
      output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
      output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
      output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
    } else {
      output += YYYY + separator + MM + separator + DD
    }
    return output
  }
}
