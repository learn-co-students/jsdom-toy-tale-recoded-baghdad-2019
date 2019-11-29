const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// My code
document.addEventListener('DOMContentLoaded', function () {
  fetchToys()
})

function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => displayToys(json))
}

function displayToys(toysArray) {
  let collectionDiv = document.getElementById("toy-collection")
  toysArray.map(toy => {
    let newDiv = document.createElement("div")
    newDiv.className = "card"
    let h2 = document.createElement("h2")
    h2.innerHTML = toy.name
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText = toy.likes
    let button = document.createElement("button")
    button.className = "like-btn"
    button.innerHTML = "Like"
    button.onclick = function () {
      fetch("http://localhost:3000/toys/" + toy.id).then(res => res.json())
        .then(obj => {
          updateLikes("http://localhost:3000/toys/" + toy.id, obj.likes)
          p.innerText = obj.likes + 1
        })

    }
    collectionDiv.appendChild(newDiv)
    newDiv.append(h2, img, p, button)
  })
}

let form = document.getElementById("form")
form.onsubmit = getValuesFromForm;

function getValuesFromForm() {
  let toyName = form.name.value
  let toyImgUrl = form.image.value
  submitData(toyName, toyImgUrl)
}

function submitData(toyName, imgUrl) {
  let formData = {
    name: toyName,
    image: imgUrl,
    likes: 0
  }
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObject)
}

function updateLikes(linkLike, previouseLikes) {
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": previouseLikes + 1
    })
  }
  fetch(linkLike, configObject)
}