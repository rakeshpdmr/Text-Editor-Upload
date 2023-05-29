//var fs = require("fs");

//  get user by email request using fetch() 
// Another way of initializing quill with options, will get into those later // Let's just get our precious content out.... 
var quill = new Quill('#editor', { theme: 'snow' });


function writeFile(fileName, data){
  fs.writeFile(
    `./html-files/${fileName}.html`,
    `${data}`,
    function (err) {
      if (err) {
      return console.error(err);
      }
    
      // If no error the remaining code executes
      console.log(" Finished writing ");
      console.log("Reading the data that's written");
    
      // Reading the file
      fs.readFile(`./${fileName}.html`, function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Data read : " + data.toString());
      });
    }
    );
}

let dataForm = document.getElementById("data-form");
 dataForm.addEventListener("submit", (e) => {
   e.preventDefault();
   let user = document.getElementById("user-id");
   let userId = user.value;
   console.log(userId);
   let data = quill.root.innerHTML;
   const date = new Date();
   let dateString = date.toString();
   dateString = dateString.substring(0, 24);
   console.log(dateString);
   fetch(`http://localhost:3000/user/`, {
            method: 'POST',
            body: JSON.stringify({
              user_id : `${userId}`,
              data : `${data}`,
              time: `${dateString}`,
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
            });

 });

