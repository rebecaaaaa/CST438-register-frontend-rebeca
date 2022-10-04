import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import AddStudent from './components/AddStudent';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Student Enrollment Database - Home
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/semester">Course Schedules</Link>{' '}
        <Link to="/addstudent">Add a New Student</Link>{' '}
      <Switch>
        <Route path ='/semester' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path ='/addstudent' component={AddStudent}/> // entered in new route for AddStudent component
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;