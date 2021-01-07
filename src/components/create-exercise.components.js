import React, {useCallback, useEffect, useRef, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
function CreateExercise(){
   const [username, setUsername] =useState("")
   const [description, setDescription] =useState("")
   const [duration, setDuration] =useState(0)
   const [date, setDate] =useState(new Date())
   const [users, setUsers] =useState([])
   const userInput=useRef("userInput")

   const onChangeUsername = useCallback((e)=>(
       setUsername(e.target.value)
   ),[])
    const onChangeDescription = useCallback((e)=>(
        setDescription(e.target.value)
    ),[])
    const onChangeDuration = useCallback((e)=>(
        setDuration(e.target.value)
    ),[])
    const onChangeDate = useCallback((date)=>(
        setDate(date)
    ),[])
    // const onChangeUsers = useCallback((e)=>(
    //     setUsers(e.target.value)
    // ),[])

    
    useEffect(()=>{
        setUsers(['test user'])
        setUsername('test user')
        let temparr = []
        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length>0){
                    response.data.map(user =>
                         {
                            temparr.push(user.username)
                         }
                         )
                    setUsers(temparr)
                    setUsername(response.data[0].username)
                }
            })
    },[])
    const onSubmit = useCallback(event=>{
        event.preventDefault();
        const exercise = {
            username: username,
            description:description,
            duration: duration,
            date: date
        }
        console.log(exercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
        .then(res =>console.log(res.data));

        window.location = '/'
    },[username, description, duration, date])
    return (
        <>
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className = "form-group"> 
                    <label>Username: </label>
                    <select ref = {userInput} required className = "form-control" value = {username} onChange = {onChangeUsername}>
                        {users.map(function(user){
                            return <option key={user} value={user}>{user}</option>
                        })}
                    </select>
                </div>
                <div className = "form-group"> 
                    <label>Description: </label>
                    <input type="text" required className = "form-control" value = {description} onChange = {onChangeDescription}/>
                </div>
                <div className = "form-group"> 
                    <label>Duration (in minutes): </label>
                    <input type="text" className = "form-control" value = {duration} onChange = {onChangeDuration}/>
                </div>
                <div className = "form-group"> 
                    <label>Date: </label>
                    <div>
                        <DatePicker selected = {date} onChange = {onChangeDate} />
                    </div>
                </div>
                <div className = "form-group"> 
                   <input type="submit" value = "create Exercise Log" className = "btn btn-primary"/>
                </div>
            </form>

        </div>
        </>
    )
}

export default CreateExercise