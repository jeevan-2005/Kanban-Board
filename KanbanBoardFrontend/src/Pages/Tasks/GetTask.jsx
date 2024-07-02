import { useEffect, useState } from "react";
import axios from "axios";

const GetTask = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        "https://kanban-board-o9qy.onrender.com/api/task/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setTasks([...response.data]);
    } catch (error) {
      console.log("Error in fetching the tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-table-container">
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <select
                  value={task.status}
                >
                  <option value="to-do">To-do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  
  );
};

export default GetTask;
