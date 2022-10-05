import React, { Component } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';		
import Select from '@mui/material/Select';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

class AddStudent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			student_id: null,
			name: "", 
			email: "", 
			status:null,
			statusCode: 0};
	};

	handleStatusChange = (event) => {
		
		this.setState({[event.target.name]: event.target.value});

	}

	handleAddStudent = () => {

		const token = Cookies.get('XSRF-TOKEN'); 

		// before fetch 
		// display using the toast before fetch 

		if (this.state.name.length===0) {
			toast.error ("Name cannot be empty. Could not add student to database", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			
			return; 
		}

		if (this.state.email.length===0) {
			toast.error ("Email cannot be empty. Could not add student to database", {
				position: toast.POSITION.BOTTOM_LEFT
			});
	
			return; 
		}

		let student = {
			'name': this.state.name, 
			'email': this.state.email, 
			'statusCode': this.state.statusCode
		};

		fetch (`${SERVER_URL}/student`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json', 
				'X-XSRF-TOKEN': token
			}, 

			body: JSON.stringify(student)
			})




		.then(res => {
			if (res.ok) {
				toast.success("Student was added to database", {
					position: toast.POSITION.BOTTOM_LEFT
				}); 
			}
				else {
					toast.error("Could not add student to database", {
						position: toast.POSITION.BOTTOM_LEFT
					}); 
					console.error('Request post http status =' + res.state);
				}
			})
		.catch(err => {
			toast.error ("Could not add student to database", {
				position: toast.POSITION.BOTTOM_LEFT
			}); 
			console.error(err);
		});
	}

	// added button for new student to be added using name and email 
	// new student add button also sets status codes for new student added
	render() {

		return (
			<div >
			<AppBar position="static" color="default">
			    <Toolbar>
			       <Typography variant="h6" color="red">
			          Add a new student - enter name, email, and status code
			       </Typography>
			    </Toolbar>
			 </AppBar>
			 <div>
			 <Grid>
				<Grid item xs={5}><TextField fullWidth label="Student Name" name="name" onChange={this.handleStatusChange}  /> </Grid>
				<Grid item xs={5}><TextField fullWidth label="Student Email" name="email" onChange={this.handleStatusChange}  /> </Grid>
				<Grid item xs={5}><InputLabel id="student_status_code">Student Status Code</InputLabel></Grid>
				<Grid item xs={5}>
				<Select
					labelId='status_code_select_label'
					id='student_status_code'
					label="Status Code"
					name="statusCode"
					onChange={this.handleStatusChange}
					defaultValue={0}
				>
				<MenuItem value={0}>0</MenuItem>
				</Select>
				</Grid>
				<Grid item xs={5}>
				<Button  
					variant="outlined" color="primary" style={{margin: 50}}
					onClick={this.handleAddStudent}
					>
					Add New Student!
					</Button>
				</Grid>
	 			</Grid>
	 			 <div style={{width:'100%'}}>
           		 </div>
			 	</div>
             <ToastContainer autoClose={1500} />   
	      </div>
		);

	}

}

export default AddStudent; 