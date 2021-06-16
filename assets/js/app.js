console.log('Loading JS')




const weatherinp = document.querySelector('form')
const para = document.querySelector('#msg')

para.textContent = ''

weatherinp.addEventListener('submit', (e)=>{
    e.preventDefault();
    para.textContent = 'Loading.....'
    console.log('testing')
   const inp =  document.querySelector('input').value


   fetch(`/weather?address=${inp}`).then(response =>{
    response.json().then(data=>{
        if(data.error)
        {
            console.log(data.error)
        }
        else{
            para.textContent = `${data.location} : ${data.forecast.temperature} : ${data.forecast.weather_desc[0]}`
            console.log(data)
        }
    })
})

})