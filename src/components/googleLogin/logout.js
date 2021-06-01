import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const clientId =
  "497954184782-qkgk3kkmcljmeugcjt7r89i7voiam3rn.apps.googleusercontent.com";

function Logout({ setAuth, setLoading }) {
  let history = useHistory();
  const onSuccess = () => {
    localStorage.removeItem("token");
    setAuth(false);
    setLoading(true);
    Swal.fire(t("Logged Out Successfully"), t("Redirecting to homepage"), "success");
    setTimeout(() => {
      history.push("/");
    }, 2000);
    setLoading(false);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        cookiePolicy="single_host_origin"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <button
            className="google-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            type="button"
          >
            <span
              style={{ cursor: "pointer" }}
              className="google-button-logout__text"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </span>
          </button>
        )}
      />
    </div>
  );
}

export default Logout;
