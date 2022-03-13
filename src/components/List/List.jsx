import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUser } from "../../features/User/actions";
import { ListItems } from "../ListItems/ListItems";
import { Link } from "react-router-dom";
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

  const addToFavorite = (e) => {
    if (localStorage.getItem("listmanagement") === null) {
      localStorage.setItem("listmanagement", JSON.stringify([]));
    }
    let data = JSON.parse(localStorage.getItem("listmanagement"));
    let favoriteData = users.filter((el) => (el?.isChecked ? true : false));

    favoriteData.forEach((el) => {
      let bool = false;
      data.forEach((val) => {
        if (val._id === el._id) {
          bool = true;
        }
      });
      if (!bool) {
        data.push(el);
      }
    });

    localStorage.setItem("listmanagement", JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem("listmanagement")));
  };

  return loading ? (
    <div className="responseImageLoading">
      <img src="./loading.gif" alt="loading"></img>
    </div>
  ) : error ? (
    <div className="responseImageError">
      <img src="./error.png" alt="error"></img>
    </div>
  ) : (
    <div>
      <div id="buttonsDiv">
        <div>
          <button>Delete Selected</button>
        </div>
        <div>
          <button onClick={addToFavorite}>Add Selected to Favorite</button>
        </div>
        <div>
          <Link to="/favorite">
            <button>Go to Favorite</button>
          </Link>
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
