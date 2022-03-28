import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import LoginForm, { ILoginValues } from "./LoginForm";

interface stateType {
  from: { pathname: string };
}

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = (location.state as stateType)?.from?.pathname || "/";
  const handleSubmit = ({ email, password }: ILoginValues) => {
    auth.login(email, password, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className=" overflow-x-hidden">
      <LoginForm onSubmitHandler={handleSubmit} />
    </div>
  );
};
export default LoginPage;
