console.log('Client side javascript is loaded!')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo  = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()


    document.getElementById("message2").innerHTML = "";

    const location = search.value
    const url = '/weather?location='+ location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            document.getElementById("message2").innerHTML = data.error;


        }
        else {
            console.log(data.data)
            document.getElementById("message2").innerHTML = 'The forecast in ' +  location.charAt(0).toUpperCase() + location.slice(1)  +  ' is ' + data.data

        }
        
    })  
})


})

