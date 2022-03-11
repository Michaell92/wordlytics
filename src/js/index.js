
const axios = require('axios')
const check = document.getElementById('check')

// Event listeners

check.addEventListener('click', analyze)




// Functions
// async function analyze() {
//     try {
//         const response = await axios.get('https://reqres.in/api/products/3')
//         console.log(response)
//     } catch (err) {
//         console.log(err)
//     }
    
// }
 function analyze(e) {
     e.preventDefault()

    axios.get('https://reqres.in/api/products')
    .then(function (response) {
        console.log(response)
    })
    .catch(err => console.log(err))

    
}





