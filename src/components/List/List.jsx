import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUser } from "../../features/User/actions";
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

  const handelChange = (e) => {
    let { name, checked } = e.target;
    if (name === "selectAll") {
      let tempData = users.map((el) => ({ ...el, isChecked: checked }));
      dispatch(setUser(tempData));
    } else {
      let tempData = users.map((el) =>
        el._id === name ? { ...el, isChecked: checked } : el
      );
      dispatch(setUser(tempData));
    }
  };
  console.log(users);
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
              <input
                type="checkbox"
                className="checkbox"
                name="selectAll"
                checked={
                  users.filter((el) => el?.isChecked !== true).length < 1
                }
                onChange={handelChange}
              ></input>
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
            <ListItems
              {...el}
              index={i}
              key={el._id}
              handelChange={handelChange}
            ></ListItems>
          ))}
        </tbody>
      </table>
    </div>
  );
};
