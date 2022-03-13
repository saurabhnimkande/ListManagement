import { useEffect, useState } from "react";
import { ListItems } from "../ListItems/ListItems";
import "./List.css";
export const List = () => {
  let [userData, setUserData] = useState([]);

  const getUserData = async () => {
    let data = await fetch("http://localhost:2525/");
    let res = await data.json();
    setUserData(res.users);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td className="checkLength">
              <input type="checkbox" className="checkbox"></input>
            </td>
            <td>Sr.no</td>
            <td>Full Name</td>
            <td>DOB</td>
            <td>Email</td>
            <td>Gender</td>
          </tr>
        </thead>
        <tbody>
          {userData.map((el, i) => (
            <ListItems {...el} index={i} key={el._id}></ListItems>
          ))}
        </tbody>
      </table>
    </div>
  );
};
