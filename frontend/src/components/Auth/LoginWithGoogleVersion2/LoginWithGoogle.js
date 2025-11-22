import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function Login() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decodedInformations = jwtDecode(
              credentialResponse.credential
            );
            console.log("Decoded credentials:", decodedInformations);
            if (credentialResponse && credentialResponse.credential) {
              localStorage.setItem(
                "accessToken",
                credentialResponse.credential
              );
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          prompt="select_account"
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
