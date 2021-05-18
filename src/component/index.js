/*
	This is your frontend file.
*/

import React from "react";											//importing Reactjs


//TodoApp is the main function of this file which is exported to the main App file.

const TodoApp = () => {	
	const [allTask, setAllTask] = React.useState([]);				/*useState is a Reactjs hook. it is used 
to use a certain state of the file. Also defines allTask array and setAllTask as a function*/


// NewTask is a function which takes input from user and sends it to the backend to store in the database.
															
	const NewTask = () => {
		var task = document.getElementById("task");					//getting the input using id - "task"
		if (task.value.length >= 5) 								//if input is greater than 5 then only 
			{														//it will be stored.
				setAllTask([{title:task.value},...allTask]);		//setAllTask takes an array and appends new data 
				var formdata = new FormData();						//FormData is a function used to construct
				formdata.set('title' , task.value);					// set of key pair value pairs.
				formdata.set('isCompleted', false);					
				fetch("http://localhost:4000/create-new-task", {	//fetch function is used to fetch the api takes the location address as parameter
					method:"POST",									//defining method attribute as POST because it is sent/retreive to backend to save.
					body:formdata,									//calling formdata in body
				});
				task.value = "";									//clearing value.
			} 
		else														//if the input is less than 5 chars.
			{
				alert("Please enter atleast 5 characters.");
			}
	};


// GetMoreTasks gets task from the database through backend.

	const GetMoreTasks = () => {									//defining function
	  fetch("http://localhost:4000/alltasks")						//fetching the location where tasks are returned from
	  .then((res) => res.json())									//gets response. converts the data to json.
	  .then((res) => {
		  setAllTask(res.allTasks)									//puts data in the array.
	  });
	};


//deleteTasks is used to delete task from frontend as well as database.

	const deleteTasks = (taskID) => {								//defining function deleteTasks.
		var formdata = new FormData();								
		formdata.set("taskID", taskID);								//getting value of id and storing it in key taskID
		fetch("http://localhost:4000/delete-task", {				//location of function at backend server which deletes the data from the database.
					method:"POST",
					body:formdata,
				}).then(() => {										//after everything above is done successfully
					GetMoreTasks();									//this is called to reload task from the database.
				});
	};


//calling GetMoreTasks in a way such that the life cycle of the file is maintained.	

	React.useEffect(() => {											//useEffect() is another react hook which is used to perform sidetask.
							GetMoreTasks();							//calls the GetMoreTask function
						},[]);										//but only at the start.


//return part of the TodoApp function, i.e. the main function of the file. 

	return (
		<div>														
		<center>													
			<h1														
				style={{
					marginBottom: "0px",							
					fontFamily: "'Orelega One'",
					}}
			>
				Manage My Tasks
			</h1>
			<div 
				style={{
					alignItems: "center" 
					}}
			>
			<input
				placeholder="Enter your task"
				id="task"
				style={{
				border: "none",
				height: "40px",
				width: "250px",
				paddingTop: "0px",
				paddingBottom: "0px",
				fontSize: "20px",
				marginBottom: "10px",
				marginRight: "10px",
				marginTop: "10px",
				borderRadius: "15px",
				}}
			></input>
			<button 
				style={{ 
					backgroundColor: "transparent",
					cursor: "pointer"
					}}
			>
				<img
					style={{ 
						width: "20px", 
						height: "25px" 
						}}
					src="http://pngimg.com/uploads/paper_plane/paper_plane_PNG61.png"
					onClick={NewTask}			
				></img>
			</button>
			</div>
			<div>
			{allTask.map((tasks, index) => {				//mapping the tasks in allTask array
				return (
					<div
						style={{
						marginBottom: "15px",
						height: "auto",
						width: "400px",
						backgroundColor: "#2F3464",
						display: "flex",
						justifyContent: "space-between",
						paddingLeft: "15px",
						alignItems: "center",
						color: "white",
						borderRadius: "20px",
						wordBreak: "break-word",
						}}
					>
					<p
					style={{
						fontFamily: "'KoHo'",
						
						textTransform: "capitalize",
						}}
					>
					{index + 1}. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tasks.title}
					</p>
					<div
						style={{
							backgroundColor: "white",
							borderRadius:"35px",
							width:"30px",
							height:"40px",
							alignItems: "center",
							justifyContent: "center",
							display: "flex",
							marginRight:"5px",
							cursor:"pointer",
						}}
						onClick = {() => deleteTasks(tasks._id)}	//calling deleteTask function
					>
						<img 
							width={20}
							height={30}
							src = "https://www.nicepng.com/png/detail/362-3620680_delete-icon-png-download-.png"
						>
						</img>
					</div>
				</div>
				);
			})}
			</div>
		</center>
		</div>
	);
};

export default TodoApp;												//exporting TodoApp


//this is all a bunch of html code which defines all the frontend. -> line 73