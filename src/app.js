const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewpaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpaths)
hbs.registerPartials(partialsPath)



app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
      title: 'Weather',
      name: 'Tanjeem Rhyne'
  })
})

app.get('/weather', (req, res) => {
  if(req.query.location){
    console.log('pt')
    geocode(req.query.location, (error, {latitude,longitude,location}={}) => {
      if (error) {
        console.log(error)
        return res.send({error})
        
      }
      forecast(latitude, longitude, (error, data) => {
        if (error) {
          console.log(error)
          return res.send({error})
        }
        console.log(data)
          return res.send(data)
      })
  })}
  

    
 
})


app.get('/about', (req, res) => {
    res.render('about',{
      title: 'About Me',
      image: "/images/headshot.png"
    })
})

app.get('/products', (req,res) => {
  if (!req.query.search){
    res.send('no search term try again')
  }
  else {
    res.send({products:[req.query.search]})

  }
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: 'Help',
    name: 'Tanjeem Rhyne'
})
})


app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404',
    body: 'Help page not found'
})
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    body: ' page not found'
})
})

app.listen(3000, () => {
  console.log('Server is up on the port 3000.')
})
