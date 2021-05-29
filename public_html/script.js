const socket = io(),
  resource = 'http://localhost:8080/api/chat',
  // MSG
  form = document.getElementById('chat'),
  msgContent = form.querySelector('input'),
  messagesDiv = document.getElementById('messages')

// HTTP REQUEST
function httpRequest (method, link, data) {


  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()

    xhttp.open(method, link, true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(data))
    
    xhttp.onload = function () {
      if (this.status == 200) resolve(xhttp.response)
      else reject(xhttp.response)
    }
   
  })
}

// function updateMesages () {

//   httpRequest('GET', `${resource}/messages`)
//     .then(res => {
//       const messages = JSON.parse(res),
//         list = document.createElement('ul')

//       for (let i = 0; i < messages.length; i++) {
//         list.innerHTML += `<li>  ${messages[i]}</li>`
//       }
//       messagesDiv.appendChild(list)
//     })
 
// }


// Submit MSG
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const payload = {}
  if (msgContent) {
    payload.content = msgContent.value
    httpRequest('POST', `${resource}/send-message`, payload)
      .then((res) => {
        console.log('res', res)
        messagesDiv.append(JSON.parse(res.content))
      })
      .catch((err) => console.log('err', err))
  } else alert('there is no message')
 
})