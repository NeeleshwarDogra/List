/*
        This is the file which is working on backend.
*/

const server = require('express');                  //importing express
const corss = require('cors');                      //importing cors(for permission purposes)
const formidable = require("formidable");           //formidable allows us to  work with database
const {Task} = require('./taskmanage');             //this will be the format of our data

const app = server();
app.use(corss());


const mongoose = require("mongoose");               //importing mongoose.
const { Formidable } = require('formidable');       //declaring a var for using formidable


//connecting our database to the file using mongoose.

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager" , {
    useNewUrlParser : true,             
    useUnifiedTopology : true,
    useCreateIndex : true, 
}).then(() => {
    console.log("DB CONNECTED");
});


//creating a function to that can send data to our database from frontend.

app.post("/create-new-task" , (req,res) => {                        
    var form = new formidable.IncomingForm();           //a variable form to use formidable     
    form.parse(req,(err,data,fileData) => {             //IncomingForm() is the function which gets data
        var newTask = Task(data);                       //parsing data received from frontend.
        newTask.save((error, task) => {                 //saving the data in our database.
            if(error) {
                return res.json({
                    status:false,
                });
            }
            else {
                return res.json({       
                    status:true,                        //return response json as true,confirming the data
                });                                     //is saved in the database.
            }
        })
    });
});


//creating a function to delete files from the database.

app.post("/delete-task" , (req,res) => {                        //naming a location as delete-task(url)
    var form = new formidable.IncomingForm();           
    form.parse(req , (error,data,filedata) => {
        console.log(data);
        Task.findOneAndDelete({_id: data.taskID}, () => {       //findOneAndDelete is a function which
            return res.json({                                   //finds the parameter and deletes the file
                status:true,
            });
        });
    });
});


//creating a function which can return data TO the frontend.

app.get("/alltasks"  , (req , res) => {                 //gets a request and sends a response 
    Task.find({} , (error, tasks) => {                  //find function finds file from database
        return res.json({allTasks: tasks});             //returning the data as json to the frontend
    }); 
})


app.get("/home",(req,res) => {
    res.send("Works fine ig.");
})


app.listen(4000 , () => { 
    console.log("Yo sup");
});




// const { FormidableError } = require('formidable/formidableerror');

// var newTask = new Task({
//     title :"lets goooooo",
//     isCompleted : false, 
// });

// newTask.save((error ,task) => {
//     if (error) {
//         console.log(error);
//     }
//     else {  
//         console.log(task);
//     }
// });


// app.get("/alltasks"  , (req , res) => {
//     Task.find({} , (error, tasks) => {
//         // var allTasks = [];
//         // tasks.map((task,index) => {
//         //     allTasks.push(task.title);
//         // });
//         return res.json({allTasks: tasks});
//     });
//     // const allTasks = ["Task" , "Task" , "Task" , "Task"];
//     // res.send("Okay this works.")    
// })
