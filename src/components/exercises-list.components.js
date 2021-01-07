import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Exercise = props =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td><Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteExercise(props.exercis._id)}}>delete</a></td>
    </tr>
)

function ExercisesList() {
    const [exercises, setExercises] = useState("")
    
    useEffect(()=>{
        setExercises([])
        axios.get('http://localhost:5000/exercises/')
        .then(response =>{
            setExercises(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        
    },[])

    const deleteExercise = useCallback((id)=>{
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res.data));
        setExercises(exercises.filter(el=>el._id !== id))
    },[exercises])
    
    const mapExercises = useMemo(()=>{
        return exercises&&exercises.map(curr =>{
            return <Exercise exercise={curr} deleteExercise = {deleteExercise} key={curr._id} />
        })
    },[exercises,deleteExercise])

    return (
    <>
    <div>
        <h3>Logged Exercises</h3>
        <table className ="table">
            <thead className = "thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {mapExercises}
            </tbody>
        </table>
    </div>
    </>
    )
}

export default ExercisesList