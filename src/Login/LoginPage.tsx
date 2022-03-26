import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

// let errors: FormikErrors<FormValues> = {};
interface stateType {
  from: { pathname: string };
}
const LoginForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = (location.state as stateType)?.from?.pathname || "/";
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
