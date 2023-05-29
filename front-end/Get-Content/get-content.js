let getContentForm = document.getElementById("get-content-form");
const getContentId = document.getElementById("get-content-id");
 getContentForm.addEventListener("submit", (e) => {
   e.preventDefault();
   console.log("button clicked");
   console.log(getContentId.value);
   let inputValue = getContentId.value;
   fetch(`http://localhost:3000/user/user_id/${inputValue}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
        contentid = json[0]._id;
        console.log(contentid);
        getUser(contentid);
        console.log(`userid ${contentid} was printed`)
      }); 
 });


 
 // get content by id 
const getUserDetails = document.getElementById("get-content-details");
function getUser(inputValue) {
    fetch(`http://localhost:3000/user/mongid/${inputValue}`)
      // Converting received data to JSON
      .then((response) => response.json())
      .then((json) => {
        // Create a variable to store HTML
        console.log(json);
        console.log(json.__id);
        console.log(json.user_id);
        document.getElementById("get-content-details").innerHTML = `
                      <div class="alert alert-dismissible alert-warning">
                          <ul style="width: 1000px;">
                            <li class="list-group-item list-group-item-success" style=" text-align : center; font-size: 25px; color:black; font-weight: bold; border : 3px solid black; width: 1000px; "> ID - ${json.user_id}</li>
                            <li class="list-group-item list-group-item-warning" style=" text-align : center; font-size: 25px; color:black; : 3px solid black; width: 1000px;">  ${json.data}</li>
                          </ul>                       
                      </div>`;
      });
  }