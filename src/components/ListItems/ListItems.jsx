export const ListItems = ({
  first_name,
  last_name,
  dob,
  email,
  gender,
  index,
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" className="checkbox"></input>
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
