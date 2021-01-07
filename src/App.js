import React from 'react';
import { BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
//import router from '../backend/routes/exercises';

import Navbar from "./components/navbar.components";
import ExercisesList from "./components/exercises-list.components";
import EditExercise from "./components/edit-exercises.components";
import CreateExercise from "./components/create-exercise.components";
import CreateUser from "./components/create-user.components";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
        <br/>
        <Route path = "/" exact component = {ExercisesList} />
        <Route path = "/edit/:id" exact component = {EditExercise} />
        <Route path = "/create" exact component = {CreateExercise} />
        <Route path = "/user" exact component = {CreateUser} />
      </div>
    </Router>
  );
}

export default App;
