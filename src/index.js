const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
let url="http://localhost:3000/toys";
fetch(url,
{ headers: {
  'Content-Type':'application/json',
  'Accept': 'application/json'
},
method: "GET"}
).then(resp => resp.json())
.then(function(toys){
  let toysDiv=document.querySelector("#toy-collection");
  for (let toy of toys){
    function f(id,name,image,likes){
      this.id=id;
      this.name=name;
      this.image=image;
      this.likes=likes;
    }
    let newDiv=document.createElement('div');
    let elemObj=new f(toy.id,toy.name,toy.image,toy.likes);
    newDiv.class="card";
    console.log(elemObj);
    newDiv.innerHTML=JSON.stringify(elemObj);
    JSON.stringify(newDiv);

    console.log(newDiv);
    toysDiv.appendChild(newDiv);
  }
})