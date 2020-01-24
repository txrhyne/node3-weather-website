const call = require('request')

const geocode = (address,callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1IjoidGFuamVlbXJoeW5lIiwiYSI6ImNrM3Qzd2twcjBjNmkzbXJxZW4zaDFhY2YifQ.gu9avhV3GLRH3sCho4zUrA"

  call({ url, json:true },  (error, {body}) => {

  if(error) {
    callback(error,undefined)
  } else if (body.features.length == 0) {
    callback('you have chosen a bad location - try again',undefined)
  } else {
    callback(undefined,{latitude: body.features[0].center[1],
    longitude: body.features[0].center[0],
    location: body.features[0].place_name,area: address})
  }
  }
)}

module.exports = geocode
