window.onload = event => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("Signed in as " + user.displayName)
      const googleUserId = user.uid
      getNotes(googleUserId)
    }
    else {
      window.location = "index.html"
    }
  })
}

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`)
  notesRef.on("value", (snapshot) => {
    const data = snapshot.val()
    renderDataAsHtml(data)
  })
}

const renderDataAsHtml = (data) => {
  let cards = ``
  for (const noteItem in data) {
    const note = data[noteItem]
    cards += createCard(note)
  }
  document.querySelector("#app").insertAdjacentHTML("beforeEnd", cards)
}

const createCard = (note) => {
  const colors = ["primary", "link", "info", "success", "warning", "danger"]
  let randomColor = colors[Math.floor(Math.random() * colors.length)]
  return `
    <div class="column is-one-quarter">
      <div class="card has-background-${randomColor}">
        <header class="header">
          <p class="card-header-title">${note.title}</p>
        </header>
        <div class="card-content">
          <div class="content">${note.text}</div>
        </div>
      </div>
    </div>
  `
}