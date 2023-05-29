const UserModel = require('../model/user')
var fs = require("fs");

// create a text content inside a database
exports.create = async (req, res) => {
    if (!req.body.user_id && !req.body.data) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    else{
        write(req.body.user_id , req.body.data)
    }
    const user = new UserModel({
        user_id: req.body.user_id,
        data: req.body.data,
        time: req.body.time,
    });
    
    await user.save().then(data => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

function write(fileName, data){
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
            fs.readFile(`./html-files/${fileName}.html`, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Data read : " + data.toString());
            });
        }
        );
}

// function to get all data
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        console.log(typeof user);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};



// function to get all data
exports.findAllHtml = async (req, res) => {
    try {
      //const users = await UserModel.find();
      const users = await UserModel.find().lean();
      const updatedData = await Promise.all(users.map(async (obj) => {
        try {
          const data = await fs.promises.readFile(`./html-files/${obj.user_id}.html`);
  
          console.log("Read data: " + data.toString());
  
          return {
            ...obj,
            datahtml: data.toString() // Replace "value" with the desired value for the new property
          };
        } catch (err) {
          console.error(err);
        }
      }));
  
      console.log(updatedData);
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



// Find a single User with an email
exports.findOneContent = async (req, res) => {
    try {
        const user = await UserModel.find(
            {user_id: req.params.user_id}
        )
        console.log(user);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};


// Find a single User with an email
exports.findOneContenthtml = async (req, res) => {
    try {
      const user = await UserModel.findOne({ user_id: req.params.user_id }).lean();
  
      try {
        const data = await fs.promises.readFile(`./html-files/${req.params.user_id}.html`);
        user.datahtml = data.toString();
        console.log(user);
      } catch (err) {
        console.error(err);
      }
  
      console.log(user.datahtml);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  


// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};



exports.findOne = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  


//update 
exports.update = async (req, res) => {
    //console.log(req.params.user_id + req.body.data + req.body.date);
    const user_id = req.params.user_id;
    var data = await req.body.data;
    let userfromdb = await UserModel.findOne({
      user_id: req.params.user_id,
    }).lean();

    let mongoid = userfromdb._id;
    console.log("mongo id " + mongoid);
    console.log(userfromdb.data);
    console.log(userfromdb.data +" before update "+ userfromdb.time);
    userfromdb.time = req.body.date;
    console.log(userfromdb.data +" after update "+ userfromdb.time);


    if (!userfromdb) {
      res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    
  
    if (!userfromdb.user_id && !req.body.data) {
      res.status(400).send({ message: "Content can not be empty!" });
    } else {
      fs.writeFile(
        `./html-files/${user_id}.html`,
        `${data}`,
        function (err) {
            if (err) {
                return console.error(err);
            }
        
            // If no error the remaining code executes
            console.log(" Finished writing ");
            console.log("Reading the data that's written");
        
            // Reading the file
            fs.readFile(`./html-files/${user_id}.html`, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Data read : " + data.toString() + req.body.data);
            });
        }
        );
      console.log(userfromdb.data);
      console.log(userfromdb.data +" "+ req.body.date);
      userfromdb.time = req.body.date;
    }

    /*
    const user = new UserModel({
      user_id: req.body.user_id,
      data: req.body.data,
      time: req.body.time,
    });
    */
    userfromdb.time = req.body.date;
    await UserModel.findByIdAndUpdate(mongoid, userfromdb, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`,
          });
        } else {
          res.send({ message: "User updated successfully." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  
  };



  
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    console.log(user.user_id);
    fs.unlink(`./html-files/${user.user_id}.html`, function (err) {
      if (err) throw err;
        console.log('File deleted!');
    });
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};