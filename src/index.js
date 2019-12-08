let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
fetch("http://localhost:3000/toys")
  .then(function(res) {
    return res.json();
  })
  .then(function(toys) {
    let body = document.querySelector("body");
    body.innerHTML = "";
  let toyDiv= document.querySelector("#toy-collection");
    for (const toy of toys) {
      let elem = document.createElement("div");
      elem.class="card"
      elem.innerHTML = toy;
      toyDiv.appendChild(elem);
    }
  })