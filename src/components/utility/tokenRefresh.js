export const refreshTokenSetup = (res) => {
  //timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes: ", newAuthRes);

    console.log("new auth Token", newAuthRes.id_token);

    //setup other timer after first
    setTimeout(refreshToken, refreshTiming);
  };

  //setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};
