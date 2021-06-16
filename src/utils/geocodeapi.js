const request = require('request')
const req = require('request')
var location;
var longitude;
var latitude;




getgeocode = function(address, callback){
    const urlmapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoic2hhcmlxdWU1IiwiYSI6ImNrb3NoYm1mdjAxZWQyb2s3eW85M3dmMzEifQ._8PV8ro_pcUCNKF8zP5S0Q&LIMIT=1'

    req({url: urlmapbox, json: true}, (error, response)=>{
        if(error)
        {
            callback('Unable to connect to server!!', undefined)
        }else if(response.body.features.length === 0)
        {
          console.log('No match for this location')
        }
        else 
        {
            callback(undefined, {
                longitude : response.body.features[0].center[1],
                latitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
         
        console.log(response.body.features[0].center[1])
        var ll =  response.body.features[0].center[1] + ',' + response.body.features[0].center[0]
        console.log('ll: '+ll)
        //getweather(ll)
        }
    })    

}

const geo ={
    geo : getgeocode
}
getgeocode('New York', (error, data)=>{
    console.log(error)
    console.log(data)
})

getweather = function(ll,callback){
    var d;
    const url = 'http://api.weatherstack.com/current?access_key=55ef3cfc91b911fb4c1be54a49fa8072&query=' + ll + '&units=s'
    console.log('a: '+ url)
    request({url:url,  json:true}, (error, {body})=>{
       //console.log(response.body)
       if(error)
       {
           callback(error, undefined)
       }
       else if(body.error)
       {
           callback('Unable to find location ')
       }
       else{
           var forecast ={
               temperature: body.current.temperature,
               wind_speed: body.current.wind_speed,
               weather_desc: body.current.weather_descriptions,
               visibility: body.current.visibility
           }
           callback(undefined, forecast)
       }
       
    })
    
    //it is currently  ${body.current.temperature}  degrees out. It feels like  ${body.current.feelslike}
}

module.exports = geo