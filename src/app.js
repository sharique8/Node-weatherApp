const express = require('express')
const path = require('path')
const hbs =  require('hbs')
const geo = require('./utils/geocodeapi')

console.log(__dirname)
console.log(__filename)

//Define paths for express config
const publicPath = path.join(__dirname, '../assets')
const viewPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

const app = express()

//USing hbs for dynamic pages
app.set('view engine', 'hbs')
app.set('views', viewPath) 

hbs.registerPartials(partialPaths)
//Setup static directory to serve
app.use(express.static(publicPath))   //engine first finds the page in this public folder

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Sharique Khan'
    })     //render allows render one of our views in hbs engine
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Sharique'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        helptxt: 'Contact On FB!!'
    })
})
/*app.get('', (req, res)=>{
    res.send('<h1>Hello Express!</h1>')   //Serving Up HTML
})

app.get('/help', (req, res)=>{
    res.send({
        "name" : "Sharique",
        "age" : 27
    })       //Serving Up Json
})

app.get('/about', (req, res)=>{
    res.send('Hello Express ABOUT PAGE!')
})*/

app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide address!'
        })
    }


    getgeocode(req.query.address, (error, {latitude, longitude, location} )=>{
        if(error)
        {
            return res.send({ error })
        }
        else{
            const dataop = getweather(longitude+','+latitude,(error, data)=>{
                if(error)
                {
                 return res.send({ error })
                }
                else {
                    console.log('dataop' +dataop)
                    return res.send({
                   forecast: data,
                   address: req.query.address,
                   location
               })
                }
            })
            
        }
    })

   /* res.send({
        forecast:'It is snowing',
        location: 'India',
        address: req.query.address
    })*/
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: 'Error Page'
    })
})

//app.com
//app.com/help
//app.com/info

app.listen(3000, ()=>{
    console.log('Server is up on 3000 port')
})