var quill = new Quill('#editor', {
    theme: 'snow'
  });

// making content visible to user
let getContentForm = document.getElementById("data-form");
const getContentId = document.getElementById("user-id");
function getContentFunc () {
  console.log("button clicked");
  console.log(getContentId.value);
  let inputValue = getContentId.value;
  if(inputValue.length == 0){
    alert("ID should not be null");
    return;
  }
  fetch(`http://localhost:3000/user/user_idhtml/${inputValue}`)
   // Converting received data to JSON
   .then((response) => response.json())
   .then((json) => {
     // Create a variable to store HTML
       console.log(`userid ${json.user_id} was printed`)
       console.log(json.user_id);
       //getUser(userId);
       if(json.datahtml == undefined){
        alert("ID doesn't exists");
       }
       quill.root.innerHTML = json.datahtml;
     }); 
};
  



// update when submit clicked
let updateForm = document.getElementById("data-form");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //let userid = document.getElementById("user-id");
  let userId = document.getElementById("user-id").value;
  console.log(userId);
  const date = new Date();
  let dateString = date.toString();
  dateString = dateString.substring(0, 24);
  let data = quill.root.innerHTML;
  fetch(`http://localhost:3000/user/update/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              data : `${data}`,
              date : `${dateString}`,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            // Converting received data to JSON
            .then((response) => response.json())
            .then((json) => {
              // Create a variable to store HTML
              console.log(json.message);
              alert(json.message);
              // updateMessage.innerHTML = `<p>${json.message}<p>`;

            });
});


