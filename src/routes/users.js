import { newUser } from "./users_routes/newUserRoute.js"
import { loginUser } from "./users_routes/loginUserRoute.js"
import { getProfile } from "./users_routes/getProfileRoute.js"
import { showAllUsers } from "./users_routes/showAllUsersRoute.js"
import { showUser } from "./users_routes/showUserRoute.js"
import { updUser } from "./users_routes/updateUserRoute.js"
import { delAllUsers } from "./users_routes/deleteAllUsersRoute.js"
import { delUser } from "./users_routes/deleteUserRoute.js"


const users = {
  newUser,
  loginUser,
  getProfile,
  showUser,
  showAllUsers,
  updUser,
  delUser,
  delAllUsers
}

export { users }