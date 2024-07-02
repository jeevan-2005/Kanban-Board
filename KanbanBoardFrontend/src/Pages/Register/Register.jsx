import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitRegisterForm =async (e)=>{
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      role,
    }

    const response = await axios.post("https://kanban-board-o9qy.onrender.com/api/user/register",payload)
    setMessage(response.data.msg);
    console.log(response.data.msg);
    navigate('/user/login');
  }

  return (
    <div>
      <form action="" onSubmit={submitRegisterForm}>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='enter name'/><br/>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter email'/><br/>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter password'/><br/>
        <select name="" id="" onChange={(e)=>setRole(e.target.value)} value={role}>
          <option value="">Select user type</option>
          <option value="user" >User</option>
          <option value="admin">Admin</option>
        </select><br/>
        <br />
        <button type="submit">Register</button>
      </form>

      <div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Register
