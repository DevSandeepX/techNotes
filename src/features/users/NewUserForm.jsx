import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { useAddNewUserMutation } from "./usersApiSlice";
import useTitle from "../../../hooks/useTitle";



const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{3,20}$/;

const NewUserForm = () => {
  useTitle('techNotes - Add New Note')
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles(["Employee"]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onRolesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const roleOptions = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create Account
      </h2>

      {isError && (
        <p className="text-red-600 mb-4 text-sm text-center">{error?.data?.message}</p>
      )}

      <form onSubmit={onSaveUserClicked} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onUsernameChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              validUsername
                ? "border-gray-300 focus:ring-blue-500"
                : "border-red-500 focus:ring-red-400"
            }`}
            placeholder="Enter username"
            required
          />
          {!validUsername && username && (
            <p className="text-xs text-red-500 mt-1">3-20 letters only.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              validPassword
                ? "border-gray-300 focus:ring-blue-500"
                : "border-red-500 focus:ring-red-400"
            }`}
            placeholder="Enter password"
            required
          />
          {!validPassword && password && (
            <p className="text-xs text-red-500 mt-1">3-20 chars, A-Z, 0-9, !@#$%</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
          <select
            name="roles"
            multiple
            value={roles}
            onChange={onRolesChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {roleOptions}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className={`w-full py-2 rounded-lg transition duration-200 ${
            canSave
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
