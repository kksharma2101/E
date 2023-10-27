import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const userVerify = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.cookies, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    console.log(e.message);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
