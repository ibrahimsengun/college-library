import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      await axios
        .get(
          `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${localStorage.getItem(
            "token"
          )}`
        )
        .then((res) => {
          const allUsers = [];

          for (const i in res.data) {
            allUsers.push({
              id: res.data[i].id,
              name: res.data[i].name,
              email: res.data[i].email,
              isAdmin: res.data[i].isAdmin,
            });
          }

          setUsers(allUsers);
        });
    }

    getUsers();
  }, []);

  return (
    <>
      <h1>All Users</h1>
      <div className="ui list">
        {users.length > 0 &&
          users.map((user) => (
            <div className="item" key={user.id}>
              {user.isAdmin ? (
                <div className="ui blue horizontal label">Admin</div>
              ) : (
                <div className="ui green horizontal label">User</div>
              )}
              {user.name} - {user.email}{" "}
            </div>
          ))}
      </div>
    </>
  );
};

export default AllUsers;
