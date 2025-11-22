import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

function Login() {
  return (
    <LoginSocialGoogle
      client_id={process.env.REACT_APP_OAUTH_CLIENT_ID}
      onResolve={({ provider, data }) => {
        console.log(provider, data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
}

export default Login;
