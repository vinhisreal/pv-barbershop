import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
          }
        );
        console.log("User Info:", res.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return <button onClick={() => login()}>Sign in with Google</button>;
}

export default Login;
