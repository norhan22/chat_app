const
  socketIo = io(),
  apiResource = 'http://localhost:8081/api/chat',
  addContactEndpoint = `${apiResource}/addContact`,
  sendMsgEndpoint = `${apiResource}//send-message`,
  getContactsEdpoint = `${apiResource}/contacts`,


  $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document),

  // MSG
  chatForm = $('#chat'),
  msgContent = chatForm.querySelector('input'),
  messagesDiv = $('#messages'),

  // Sign up
  signUpForm = $('#signUp'),
  User = signUpForm.querySelector('input').value,
  activeUser = {}


const chat = new Chat()

//////////////////////////
//  UI 
//////////////////////////
function welcome () {
  const welcome = document.createElement('h4')
  welcome.textContent = `welcome ${activeUser.name}`
  messagesDiv.appendChild(welcome)

}

function showChat () {
  chatForm.classList.remove('hide')
  chatForm.classList.add('show')

  signUpForm.classList.remove('show')
  signUpForm.classList.add('hide')
}

function updateMessages (data) {
  console.log(data)
  const
    msg = data.content,
    messageEl = document.createElement('p'),
    isSent = data.senderId === activeUser.id

  if (isSent) messageEl.classList.add('sent')

  messageEl.innerText = `${isSent ? activeUser.name : data.senderName} : ${msg}`
  messagesDiv.appendChild(messageEl)
}

/////////////////////////////////
// Socket IO 
////////////////////////////////
// Emit 
function emitSocket (name, payload) {
  socketIo.emit(name, payload)
}

// Listen 
function listenSocket (name, callback) {
  socketIo.on(name, callback)
}
// Listeners 
(function () {
  listenSocket('newUser', (user) => alert(`${user.name} is registered`))
})();


(function () {
  listenSocket('newMsg', (msg) => updateMessages(msg))
})()

//////////////////////////
//  Handle Errors 
//////////////////////////
function errorMsg (err, errFrom = '') {
  $('#error').innerText = err
  console.error(`${errFrom || ''}`, err)
}

function resetErrMsg () {
  $('#error').innerTex = ''
}
///////////////////////////////

// Register Contact
signUpForm.addEventListener('submit',
  function (e) {
    e.preventDefault()
    if (User) { 
      chat.submitUser(User, addContactEndpoint)
        .then((res) => {
          emitSocket('newUser', res)
          resetErrMsg()
          activeUser.name = res.name
          activeUser.id = res.id
          
          welcome()
          showChat()
        }).catch(err => errorMsg(err))
    }
    return false
  })

// Submit MSG
function sendMsg () {
  const payload = {
    content: msgContent.value,
    senderId : activeUser.id
  }
  chat.submitMsg(payload, sendMsgEndpoint)
    .then((res) => {
      resetErrMsg()
      updateMessages(res)
      emitSocket('newMsg', res)
    })
}
chatForm.addEventListener('submit',
  function (e) {
    e.preventDefault()
    if (msgContent.value) sendMsg()
    else errorMsg('please enter a message')
  
    return false

  })
