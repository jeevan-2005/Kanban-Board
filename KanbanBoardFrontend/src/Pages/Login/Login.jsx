import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toRegister = ()=>{
    navigate('/user/register');
  }

  const submitLoginForm = async (e)=>{
    e.preventDefault();
    const payload = {
      email,
      password,
    }

    const response = await axios.post("https://kanban-board-o9qy.onrender.com/api/user/login",payload)
    setMessage(response.data.msg);
    localStorage.setItem("token",JSON.stringify(response.data.token));
    localStorage.setItem("refreshToken",JSON.stringify(response.data.refreshToken));
    console.log(response.data);

    navigate("/task/all");
  }

  return (
    <div>
      <form action="" onSubmit={submitLoginForm}>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter email'/><br/>
        <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter password'/><br/>
        <br />
        <button type="submit">Login</button>
      </form>

      <div>
        <p>{message}</p>
      </div>
      <button onClick={toRegister} >Create Account</button>
    </div>
  )

}

export default Login
