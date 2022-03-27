export type TokenType = "auth-token" | "refresh-token";

export const useAuthToken = (
  tokenName: TokenType
): [() => string, (tokenValue: string) => void, () => void] => {
  const getToken = () => getCookie(tokenName);

  const setToken = (tokenValue: string) => setCookie(tokenName, tokenValue);

  const removeToken = () => setCookie(tokenName, "", 0);

  return [getToken, setToken, removeToken];
};

const setCookie = (cname: string, cvalue: string, exdays: number = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
export const parseJwt = (token: string) => {
  if (!token) return {};
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
