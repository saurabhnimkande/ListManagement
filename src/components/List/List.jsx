import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../features/User/actions";
import { ListItems } from "../ListItems/ListItems";
import "./List.css";
export const List = () => {
  const { loading, users, error } = useSelector((state) => ({
    loading: state.loading,
    users: state.users,
    error: state.error,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  console.log(loading);
  return (
    <div>
      <div id="buttonsDiv">
        <div>
          <button>Delete Selected</button>
        </div>
        <div>
          <button>Add Selected to Favorite</button>
        </div>
        <div>
          <button>Go to Favourates</button>
        </div>
      </div>
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
          {users.map((el, i) => (
            <ListItems {...el} index={i} key={el._id}></ListItems>
          ))}
        </tbody>
      </table>
    </div>
  );
};
