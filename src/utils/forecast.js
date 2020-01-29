const request = require('request')


const forecast = (x,y, callback) => {
  const url = 'https://api.darksky.net/forecast/4204b7617d9d833004ab9fa68a999d85/' + x + ',' + y
  request({ url, json:true },(error, {body}) =>{
    if (error) {
      callback('there is a low level error', undefined)
    } else if (body.code == '400') {
      callback('there is a poorly formatted address' , undefined)
    }
      else {
        callback(undefined,{data:body.daily.summary + ' With a temperature of ' + body.currently.temperature + ' and a ' + body.currently.precipProbability + '% chance of rain. Also the windspeed is ' + body.currently.windSpeed + ' mph.' })
    }
  }
)}



module.exports = forecast
