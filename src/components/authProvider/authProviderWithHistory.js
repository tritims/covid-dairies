import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin + "/covidsafar"}
      onRedirectCallback={onRedirectCallback}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
