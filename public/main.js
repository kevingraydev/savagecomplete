var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");

//we added a function that adds some functionality to each of the the thumbs down button.
//this is going throught teh array of thumbs down icons that were create by the getElementsByClassName
//this for.each loop adds seral things, it will add a inner text node for each ttime that this loop runs.
//it will also define a number based on parseFloat
Array.from(thumbDown).forEach(function (element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText //??
    const msg = this.parentNode.parentNode.childNodes[3].innerText //?
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText) //?
//fetch decrease - why would you do that. How is it matching this up with the server
    fetch('decrease', {
      //the put method says that this is a method that will be updating a field that is always in the database.
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //this is telling you the fields to change in the database.
        'name': name,
        'msg': msg,
        'thumbDown':thumbDown //showing that the names must match the variables if you are tyring to get a value for a variable.
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
})


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
