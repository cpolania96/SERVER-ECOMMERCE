import { request, response } from "express"
import User from "../models/User.js";

const validateRoles = (roles) => async (req = request, res = response, next) => {
    // console.log(roles);
    // console.log(req);
    const { uid } = req
    let user = await User.findOne({ _id: uid})
    console.log(user.roles);
}
export default validateRoles