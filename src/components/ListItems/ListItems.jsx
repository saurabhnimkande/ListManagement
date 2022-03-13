export const ListItems = ({
  first_name,
  last_name,
  dob,
  email,
  gender,
  isChecked,
  _id,
  index,
  handelChange,
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          name={_id}
          checked={isChecked || false}
          onChange={handelChange}
        ></input>
      </td>
      <td>{index + 1}</td>

      <td>
        {first_name}
        {last_name}
      </td>
      <td>{dob}</td>
      <td>{email}</td>
      <td>{gender}</td>
    </tr>
  );
};
