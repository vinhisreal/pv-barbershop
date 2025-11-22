import { GoogleOAuthProvider } from "@react-oauth/google";

function handleLogout() {
  localStorage.removeItem("accessToken");
  console.log("User logged out");
}

function Logout() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
        <button onClick={handleLogout}>Logout</button>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Logout;
