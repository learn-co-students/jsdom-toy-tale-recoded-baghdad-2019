const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toysDiv=document.querySelector("#toy-collection");

// YOUR CODE HERE


function getToys (){
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  }

// OR HERE!
function post(toy_data){
let url="http://localhost:3000/toys";
fetch(url,
{ headers: {
  'Content-Type':'application/json',
  'Accept': 'application/json'
},
method: "POST",
body: JSON.stringify({
  "name": toy_data.name.value,
  "image": toy_data.image.value,
  "likes": 0

})}
).then(res => res.json())
.then((obj_toy) => {
  let new_toy = Render(obj_toy)
  divCollect.append(new_toy)
})
}
  
  function Render(toy){
    let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
    let newDiv=document.createElement('div');
    newDiv.class="card";
    newDiv.append(name,img,p,btn);
    toysDiv.append(newDiv);
  }

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


  getToys().then(toys => {
    toys.forEach(toy => {
      Render(toy)})})