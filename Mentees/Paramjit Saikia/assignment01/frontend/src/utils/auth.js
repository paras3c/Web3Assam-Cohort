function isUserLoggedIn() {
  return localStorage.getItem("userRegistered") === "true";
}

function loginUser() {
  localStorage.setItem("userRegistered", "true");
}

function logoutUser() {
  localStorage.removeItem("userRegistered");
}

export {isUserLoggedIn,loginUser,logoutUser}