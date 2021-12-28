
class BasicRules {
  constructor () {

  }

  /////////////////////////////////
  // HTTP REQUEST
  ////////////////////////////////
  httpRequest (method, link, data) {
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
}
class Chat extends BasicRules {
  constructor () {
    super() // call the constructor of the parent class

    this.userID = null
    this.activeUser = null
    this.contacts = []

  }

  //////////////////////////
  //  Handle Errors
  //////////////////////////
  errorMsg (err, errFrom = '') {
    console.error(`${errFrom || ''}`, err)
  }

  //////////////////////////
  //  Contacts
  //////////////////////////

  submitUser (userName, endpoint) {
    return new Promise((resolve, reject) => {

      const payload = {}
      payload.name = userName
      this.httpRequest('POST', endpoint, payload)
        .then(res => {
          console.log('addContact res', res)
          this.activeUser = res
          payload.id = res.id
          resolve(payload)

        })
        .catch((err) => {
          this.errorMsg(err, 'submitUser')
          reject(err)
        })
    })
  }
  getContacts () {
    this.httpRequest('GET', `${this.apiResource}/contacts`)
      .then(res => {
        this.contacts = res
      })
  }


  //////////////////////////
  //  Message
  //////////////////////////

  submitMsg (payload, endPoint) {
    return new Promise((resolve, reject) => {

      this.httpRequest('POST', endPoint, payload)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          this.errorMsg(err, 'submitMsg')
          reject(err)
        })

    })

  }


}