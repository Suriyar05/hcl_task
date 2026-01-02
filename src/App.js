import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState("");
  const [task, setTask] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");


  const addUser = () => {
    if (!username) return alert("Username required");
    if (users[username]) return alert("User already exists");

    setUsers({ ...users, [username]: [] });
    setUsername("");
  };

  
  const addTask = () => {
    if (!currentUser || !task || !dueDate) return alert("User , task  and due date required");
    if (!users[currentUser]) return alert("User not found");
     const newTask ={
      text:task,
      dueDate:dueDate,
      completed: false

     };

    setUsers({
      ...users,
      [currentUser]: [...users[currentUser], newTask]
    });
    setTask("");
    setCurrentUser("");
    setDueDate("")
  };

  const filteredUsers = Object.keys(users).filter((user) =>
    user.toLowerCase().includes(search.toLowerCase()) ||
    users[user].some((t) =>
      t.toLowerCase().includes(search.toLowerCase())
    )

    
  );
  const deleteTask = (user, index) => {
  const updatedTasks = users[user].filter((_, i) => i !== index);

  setUsers({
    ...users,
    [user]: updatedTasks
  });
};

const toggleComplete = (user, index) => {
  const updatedTasks = users[user].map((t, i) =>
    i === index ? { ...t, completed: !t.completed } : t
  );

  setUsers({
    ...users,
    [user]: updatedTasks
  });
};

  return (
    <div className="app">
      <h1>Multi-User To-Do App</h1>
      <div className="grid">
    <div className="column">
      <input
        placeholder="New username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
</div>
      {/* Add Task */}
      <div className="column">
      <input
        placeholder="Username"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />
      <input
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
      type="date"
      value={dueDate}
        min={new Date().toISOString().split("T")[0]}
      onChange={(e) => setDueDate(e.target.value)}
/>
      <button onClick={addTask}>Add Task</button>
</div>
   <div className="column">
      <input
        placeholder="Search by user or task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /></div>
              
      </div>

      <div className="list">
        {filteredUsers.map((user) => (
          <div key={user} className="user">
            <h3>{user}</h3>
            <ul>
  {users[user].map((t, i) => (
  <li key={i} className="task-item">
    <div className="task-left">
    <input
    type="checkbox"
    checked={t.completed}
    onChange={() => toggleComplete(user,i)}
    />

    <div className="task-text">
      <span className={t.completed ?"completed":""}>{t.text}</span>
      <small className="task-date">Due: {t.dueDate}</small>
    </div></div>

    <button
      className="delete-btn"
      onClick={() => deleteTask(user, i)}
    >
      ❌
    </button>
  </li>
))}


            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
