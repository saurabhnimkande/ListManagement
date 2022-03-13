import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Favorite = () => {
  let [data, setData] = useState([]);

  const getLocalData = () => {
    let localData = JSON.parse(localStorage.getItem("listmanagement"));
    setData(localData);
  };

  const deleteLocalData = (id) => {
    let new_data = data.filter((el) => (el._id === id ? false : true));
    localStorage.setItem("listmanagement", JSON.stringify(new_data));
    getLocalData();
  };

  useEffect(() => {
    getLocalData();
  }, []);

  if (data.length) {
    console.log("hello");
  }

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Favorite List</h1>
      <Link to="/">
        <button style={{ marginLeft: "20px", marginBottom: "20px" }}>
          Back to list
        </button>
      </Link>

      {data.length ? (
        <table>
          <thead>
            <tr>
              <td>Sr.no</td>
              <td>Full Name</td>
              <td>DOB</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={el._id}>
                <td>{i + 1}</td>
                <td>
                  {el.first_name} {el.last_name}
                </td>
                <td>{el.dob}</td>
                <td>{el.email}</td>
                <td>{el.gender}</td>
                <td>
                  <button onClick={() => deleteLocalData(el._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Favorite List is Empty!</h1>
      )}
    </div>
  );
};
