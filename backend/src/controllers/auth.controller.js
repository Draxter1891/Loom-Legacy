import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.util.js";

//REGISTER USER
export const registerController = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  //passwords check
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      errors: {
        path: "Confirm password",
        message: "Passwords don't match",
      },
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  //check user already exists
  if (isUserAlreadyExists) {
    return res.status(409).json({
      success: false,
      errors: [
        {
          path: "email",
          msg: "User already exists with this email address",
        },
      ],
    });
  }

  //Store the user into database
  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 10),
  });

  //success response
  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
      },
    },
  });
};

//LOGIN CONTROLLER
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  //If user not found in DB
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  //Verifying password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  //Generating access token
  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });

  //Generating refresh token
  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role,
  });

  //Saving the refresh token to DB
  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  //Returning the refresh token into cookies via response
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true, //only mark true for production
  });

  res.status(200).json({
    success: true,
    message: "user logged in successfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

//LOGOUT CONTROLLER
export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (refreshToken) {
      const decode = readRefreshToken(refreshToken);

      await userModel.findByIdAndUpdate(decode.userId, {
        refreshToken: null,
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

//REFRESH-TOKEN CONTROLLER
export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required.",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);

    const { userId, role } = decoded;

    const user = await userModel.findById(userId);

    //If user not found or null
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    //Cross-checking the req.refreshToken = refreshToken in DB
    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    const accessToken = createAccessToken({
      userId,
      role,
    });

    const newRefreshToken = createRefreshToken({
      userId,
      role,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      //   secure:true, //only mark true for production
    });

    res.status(200).json({
      message: "Tokens rotated successfully.",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid refresh Token",
    });
  }
};

//Get PROFILE CONTROLLER - the logged in profile information
export const getProfileController = async (req, res) => {
  const { userId, role } = req.user;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User data fetch successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        role,
      },
    },
  });
};
