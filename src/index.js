let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

})
////////////////////
function toyCardGenerater(toyData) {
  let mydiv = document.createElement("div");
  mydiv.setAttribute("class", "card")
  let name = document.createElement("h2");
  name.innerText = toyData.name;
  let image = document.createElement("img")
  image.setAttribute("src", toyData.image);
  image.setAttribute("class", "toy-avatar");
  let para = document.createElement("p");
  para.innerText = `${toyData.likes} likes`
  let button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.innerText = "Like";
  button.addEventListener('click', (e) => {
    likes(e)
  })
  let containerDiv = document.querySelector('#toy-collection')
  mydiv.append(name, image, para, button)
  containerDiv.append(mydiv);
}
///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      toys.forEach(toyData => {
        toyCardGenerater(toyData)
      })
    });
  console.log('dooom')
})
//////////////////////
function postToy(data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": data.name.value,
      "image": data.image.value,
      "likes": 0

    })
  })
    .then(res => res.json())
    .then((newToy) => {
      let new_toy = toyCardGenerater(newToy)
      let containerDiv = document.querySelector('#toy-collection')

      containerDiv.append(new_toy)
    })
console.log('clickeddd')
}

/////////////////////////////
function likes(e) {
  e.preventDefault()
  let addedLikes = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": addedLikes
    })
  })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${addedLikes} likes`;
      console.log('likessss')
    }))
}