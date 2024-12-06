import React, { useState, useEffect } from "react";
import { OAuthClient, TokenResponse } from "./oauthClient";
import LoginButton from "./components/LoginButton";
import UserInfo from "./components/UserInfo";

const client = new OAuthClient({
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
  authorizationEndpoint: import.meta.env.VITE_OAUTH_AUTHORIZATION_ENDPOINT,
  tokenEndpoint: import.meta.env.VITE_OAUTH_TOKEN_ENDPOINT,
});

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code && state) {
      const callbackParams = { code, state };
      handleOAuthCallback(callbackParams);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = client.startAuthFlow();
  };

  const handleOAuthCallback = async (callbackParams: {
    code: string;
    state: string;
  }) => {
    try {
      const tokenResponse: TokenResponse = await client.handleCallback(
        callbackParams
      );
      localStorage.setItem("access_token", tokenResponse.access_token);
      localStorage.setItem("refresh_token", tokenResponse.refresh_token);

      const userResponse = await fetch(
        import.meta.env.VITE_OAUTH_USERINFO_ENDPOINT,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const user = await userResponse.json();
      setUserInfo(user);

      //Remove code and state from the URL
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("code");
      currentUrl.searchParams.delete("state");
      window.history.replaceState({}, document.title, currentUrl.toString());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!userInfo ? (
        <LoginButton onClick={handleLogin} />
      ) : (
        <UserInfo user={userInfo} />
      )}
    </div>
  );
};

export default App;
