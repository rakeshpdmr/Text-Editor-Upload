
getAll();
function getAll(){
  fetch("http://localhost:3000/user/html")
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      let li = ``;
      console.log(json);
      // Loop through each data and add a table row
      let sno = 1;
      json.forEach((user) => {
        li += `
            <tr class="table-secondary">
                <td scope="row" style="width: 20px !important;  text-align: center">${sno++}</th>
                <td scope="row" style="width: 100px !important;  text-align: center">${user.user_id}</th>
                <td scope="row" style="width: 100px !important;  text-align: center">${user.time}</th>
                <td scope="row" style="width: 100px !important;  text-align: center">
                    <div class="options" style = "display: flex; justify-content: space-evenly;">
                        <i onClick="getPost(this)" class="fa fa-file" style="color:black; cursor: pointer; " id = "${user.user_id}"></i>
                        <i onClick="editPost(this)" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#form" style="color:black; cursor: pointer;" id = "${user.user_id}"></i>
                        <i onClick="deletePost(this)" class="fas fa-trash-alt" style="color:black; cursor: pointer; " id = "${user.user_id}"></i>
                    </div>
                </td>
            </tr>
            `;
      })
      // Display result
      document.getElementById("users").innerHTML = li;
  });
}


let myModal = document.getElementById("my-modal-view");
let getPost = (e) => {
  console.log(e.getAttribute('id'));
  let userID = e.getAttribute('id');
  myModal.style.display = "block";

  let displayContent = document.getElementById("display-content");
  fetch(`http://localhost:3000/user/user_idhtml/${userID}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      displayContent.innerHTML = json.datahtml;
    });
};


// When the user clicks on <span> (x), close the modal
let modalCloseButton1 = document.getElementById("btn-close-view");
modalCloseButton1.onclick = function() {
    myModal.style.display = "none";
  }


// When the user clicks on <span> (x), close the modal-update
let modalCloseButton2 = document.getElementById("btn-close-update");
modalCloseButton2.onclick = function () {
  myModalUpdate.style.display = "none";
};

// When the user clicks on <span> (x), close the modal-delete
let modalCloseButton3 = document.getElementById("btn-close-delete1");
modalCloseButton3.onclick = function () {
  myModalDelete.style.display = "none";
};

// When the user clicks on <span> (x), close the modal-delete
let modalCloseButton4 = document.getElementById("btn-close-delete2");
modalCloseButton4.onclick = function () {
  myModalDelete.style.display = "none";
};

let lastUpdatedUserId = "MS10";
let myModalUpdate = document.getElementById("my-modal-update");
let editPost = (e) => {
    console.log(e.getAttribute('id'));
    let userID = e.getAttribute('id');
    myModalUpdate.style.display = "block";
    getContentFunc(userID);
    lastUpdatedUserId = userID;
    
};


var quill = new Quill('#editor', {
  theme: 'snow'
});

// making content visible to user
let getContentForm = document.getElementById("data-form");
const getContentId = document.getElementById("user-id");
function getContentFunc (userId) {
  console.log("button clicked");
  console.log(userId);
  let inputValue = userId;
  //getUser(inputValue);
  //http://localhost:3000/user/user_idhtml/
  fetch(`http://localhost:3000/user/user_idhtml/${inputValue}`)
   // Converting received data to JSON
   .then((response) => response.json())
   .then((json) => {
     // Create a variable to store HTML
       console.log(`userid ${userId} was printed`)
       console.log(json.user_id);
       //getUser(userId);
       quill.root.innerHTML = json.datahtml;
     }); 
  
};
  
  
   
// get content by id 
const getUserDetails = document.getElementById("get-content-details");
function getUser(inputValue) {
    fetch(`http://localhost:3000/user/user_id/${inputValue}`)
      // Converting received data to JSON
      .then((response) => response.json())
      .then((json) => {
        // Create a variable to store HTML
        console.log(json);
        console.log(json.user_id);
        quill.root.innerHTML = json.data;
      });
  }


// update when submit clicked
let updateForm = document.getElementById("update-modal-form");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userId = lastUpdatedUserId;
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
              // updateMessage.innerHTML = `<p>${json.message}<p>`;
              myModalUpdate.style.display = "none";
              getAll();

            });
});





// delete post form
var lastDeletedUserId = "not defined";
let myModalDelete = document.getElementById("my-modal-delete");
let deletePost = (e) => {
  console.log(e.getAttribute('id'));
  lastDeletedUserId = e.getAttribute('id');
  console.log(lastDeletedUserId)
  myModalDelete.style.display = "block";
};

// When the user clicks on <span> (x), close the modal-delete
let modalYesDelete = document.getElementById("btn-yes-delete");
modalYesDelete.onclick = function () {
  let inputValue = lastDeletedUserId;
  console.log("delete first step " + inputValue);
  //getUser(inputValue);
  //http://localhost:3000/user/user_idhtml/
  fetch(`http://localhost:3000/user/user_idhtml/${inputValue}`)
   // Converting received data to JSON
   .then((response) => response.json())
   .then((json) => {
     // Create a variable to store HTML
       console.log(json.user_id);
       //getUser(userId);
       let mongoid = json._id;
       console.log(`userid ${json._id} was got`);
       http://localhost:3000/user/delete/646de6385b1f7aacd0e75fde
       fetch(`http://localhost:3000/user/delete/${mongoid}`, { method: 'DELETE'})
        // Converting received data to JSON
        .then((response) => response.json())
        .then((json) => {
          // Create a variable to store HTML
            console.log(`userid ${json.user_id} was deleted`)
            console.log(json.user_id +" "+ json.message);
            //console.log();
            //getUser(userId);
            // let mongoid = json._id;
            // console.log(mongoid);

          }); 
     }); 
  getAll();
  myModalDelete.style.display = "none";
};
