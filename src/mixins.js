import Vue from 'vue'

Vue.mixin({
  methods: {
    hi(){
      console.log('hi')
    },
    datetimeparse: (timestamp, format, prefix) => {
      // console.log(timestamp, format)
      let newtimestamp = timestamp
        ? timestamp.toString().length === 13
          ? timestamp.toString()
          : timestamp.toString().length === 10
            ? timestamp + '000'
            : null
        : null
      let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
      let YYYY = dateobj.getFullYear()
      let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
      let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
      let HH = dateobj.getHours()
      let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
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
      output = prefix ? (prefix + output) : output
      return newtimestamp ? output : ''
    },
  }
})
