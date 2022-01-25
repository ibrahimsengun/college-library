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
      <table className="ui celled table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User E-Mail</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {user.isAdmin ? (
                  <td>
                    <div className="ui green label">Admin</div>
                  </td>
                ) : (
                  <td>
                    <div className="ui blue label">User</div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AllUsers;
