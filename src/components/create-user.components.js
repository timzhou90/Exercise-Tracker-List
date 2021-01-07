import React,{useState, useCallback} from 'react'
import axios from 'axios';

function CreateUser(){
    const [username, setUsername] =useState("")


    const onChangeUsername = useCallback((e)=>{
        setUsername(e.target.value)
    },[])
  
    const onSubmit = useCallback(event=>{
       event.preventDefault();
        const user = {
            username: username,
        }
        console.log(user)
        axios.post("http://localhost:5000/users/add", user)
        .then(res =>console.log(res.data));


        setUsername('')
    },[username])


    return (
       <div>
           <h3>
               Create New User
           </h3>
           <form onSubmit = {onSubmit}>
                <div className ="form-group">
                    <label>Username: </label>
                    <input type ="text"
                    required
                    className = "form-control"
                    value={username}
                    onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                <input type ="submit"
                    className = "btn btn-primary"
                    value="create user"
                    onChange={onChangeUsername}
                    />
                </div>
           </form>
       </div>
    )
}

export default CreateUser