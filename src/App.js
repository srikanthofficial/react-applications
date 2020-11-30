
import React, { useState } from "react";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" }
  ];

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  //test
   const handleAddrTypeChange = (e) =>  console.log(users[e.target.value]);

  return (
    <div className="container">
      <h1>React Hooks</h1>
      <div className="flex-row">
        <div className="drop-down">
          <select
             onChange={(e) => handleAddrTypeChange(e)}

            onClick={() => {
              editRow(users);
            }}
          >
            {users.map((obj) => {
              return <option value={obj.id}>{obj.name}</option>;
            })}
          </select>
        </div>

        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-large">
        <h2>View users</h2>
        <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
      </div>
    </div>
  );
};

export default App;