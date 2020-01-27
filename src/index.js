let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const mainDiv = document.getElementById('toy-collection');
  
  function gettingToys() {
    return (
        fetch('http://localhost:3000/toys')
        .then(res => res.json())
    )
}

function createCardInfo(toy) {
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
    let img = document.createElement('img')
    img.src = toy.image
    img.classList.add('toy-avatar')
    let p = document.createElement('p')
    p.innerHTML = `${toy.likes} likes`;
    let cardBtn = document.createElement('button')
    cardBtn.classList.add('like-btn')
    cardBtn.innerText = "like"
    cardBtn.setAttribute('id', toy.id)
    cardBtn.addEventListener('click', (e) => {
        console.log(e.target.dataset);
        likes(e)
    })
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, cardBtn)
    mainDiv.append(divCard)
}
gettingToys().then(toys => {
    toys.forEach(toy => {
        createCardInfo(toy)
    })
})

function posttingToy(givenToy) {
    fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": givenToy.name.value,
                "image": givenToy.image.value,
                "likes": 0

            })
        })
        .then(res => res.json())
        .then((obj_toy) => {
            let new_toy = createCardInfo(obj_toy)
            mainDiv.append(new_toy)
        })
}
 addToy = !addToy
    if (addToy) {
        toyForm.style.display = 'block'
        toyForm.addEventListener('submit', event => {
            event.preventDefault()
            posttingToy(event.target)
        })
    } else {
        toyForm.style.display = 'none'
    }
  })
function likes(e) {
    e.preventDefault()
    let updateLikes = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
               },
            body: JSON.stringify({
                "likes": updateLikes
            })
        })
        .then(res => res.json())
        .then((like_obj => {
            e.target.previousElementSibling.innerText = `${updateLikes} likes`;
        }))
} 


})
