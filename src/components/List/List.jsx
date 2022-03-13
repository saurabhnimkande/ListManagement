import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUser } from "../../features/User/actions";
import { ListItems } from "../ListItems/ListItems";
import { Link } from "react-router-dom";
import "./List.css";
export const List = () => {
  // accessing states form redux
  const { loading, users, error } = useSelector((state) => ({
    loading: state.loading,
    users: state.users,
    error: state.error,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // delete the selected user and update the database and the maximum limit is 20 per request.
  const deleteSelected = () => {
    let arr = [];
    users.forEach((el) => {
      if (el?.isChecked === true) {
        arr.push(el._id);
      }
    });
    if (arr.length > 20) {
      alert("Deletion is restricted to 20 users per Request");
      return;
    }

    let updatedData = users.filter((el) => (el?.isChecked ? false : true));
    dispatch(setUser(updatedData));

    fetch(
      `https://listdatabase.herokuapp.com/user/delete?array=${JSON.stringify(
        arr
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((e) => e.json())
      .catch((e) => console.log(e));
  };

  //select all functionlity
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

  //addto favorite functionality using localstorage for storing the favorite list.

  const addToFavorite = () => {
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
    let tempData = users.map((el) => ({ ...el, isChecked: false }));
    dispatch(setUser(tempData));
    alert("Users added to favorite");
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
          <button onClick={deleteSelected} id="deleteButton">
            Delete Selected
          </button>
        </div>
        <div>
          <button onClick={addToFavorite} className="favoriteButton">
            Add Selected to Favorite
          </button>
        </div>
        <div>
          <Link to="/favorite">
            <button className="favoriteButton">Go to Favorite</button>
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
