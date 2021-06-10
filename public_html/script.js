
const
  socket = io(),
  resource = 'http://localhost:8080/api/chat',
  // MSG
  chatForm = document.getElementById('chat'),
  msgContent = chatForm.querySelector('input'),
  messagesDiv = document.getElementById('messages'),
  // Sign up
  signUpForm = document.getElementById('signUp'),
  signUpName = signUpForm.querySelector('input').value
 
let  userID = null, contacts = []


// HTTP REQUEST
function httpRequest (method, link, data) {


  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()

    xhttp.open(method, link, true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(data))
    
    xhttp.onload = function () {
      if (this.status == 200) resolve(JSON.parse(xhttp.response))
      else reject(xhttp.response)
    }
   
  })
}

//////////////////////////
//  Users 
//////////////////////////

function submitUser () {
  const payload = {}
  payload.name =  signUpName
  httpRequest('POST', `${resource}/addContact`, payload)
    .then(res => {
      console.log('addContact res', res)
      chatForm.classList.remove('hide')
      chatForm.classList.add('show')
     
      signUpForm.classList.remove('show')
      signUpForm.classList.add('hide')
      userID = res.id
      
      const welcome = document.createElement('h4')
      welcome.textContent = `welcome ${signUpName}`
      messagesDiv.appendChild(welcome)
      socket.emit('newUser', payload)
      

    })
    .catch(err => {
      console.log('addContact err', err)
    })

}
function getContacts () {
  httpRequest('GET', `${resource}/contacts`)
    .then(res => {
      contacts = res
    })

}
// Register Contact
signUpForm.addEventListener('submit', function (e) {
  e.preventDefault()
  if (signUpName) submitUser()
  return false
})

//////////////////////////
//  Message
//////////////////////////
function updateMessages (data) {
  const
    msg = data.content,
    messageEl = document.createElement('p')
        
  messageEl.innerText = `${signUpName} : ${msg}`
  messagesDiv.appendChild(messageEl)
}
function submitMsg () {
  const payload = {}
  if (msgContent) {
    payload.content = msgContent.value
    payload.senderId = userID
    
    console.log('payload', payload)
    httpRequest('POST', `${resource}/send-message`, payload)
      .then((res) => {
        updateMessages(res)        
      })
      .catch((err) => { document.getElementById('error').innerText = err })
  } else alert('lease enter a message')
}
// Submit MSG
chatForm.addEventListener('submit', function (e) {
  e.preventDefault()
  submitMsg()
  return false

})