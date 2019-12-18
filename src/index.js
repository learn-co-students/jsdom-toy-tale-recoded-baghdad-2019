let addToy = false
let toyCollection = document.querySelector("#toy-collection")


function fetchToys(){
  return fetch("http://localhost:3000/toys")
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(e){
  e.preventDefualt()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    header: {
      'Content-Type': "application/json",
      'Accept': 'application/json'

    },
    body: JSON.stringify({
      'likes': more
    })
  })
  .then(res => res.json())
  .then((like_obj => e.target.previousElementSibling.innerText = `${more} likes`
    ))
}

function renderToy(toy){
  let h2 = document.createElement("h3")
  h2.innerHTML = toy.name

  let img = document.createElement("img")
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy.avatar')

  let likes = document.createElement('p')
  likes.innerText=`${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText="like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset)
    likes(e)
  })
  
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2,img, p, btn)
  divCollect.append(divCard)
  
}
  
addBtn.addEventListener('click', () => {
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
fetchToys.then(toys => toys.map(toy => fetchToys(toy)))
