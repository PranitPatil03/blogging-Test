
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../model/User.js";

export const generateUploadURL = async () => {
  const date = new Date();

  const ImageName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3.getSignedUrlPromise("putObject", {
    Bucket: "modern-blogging-platform",
    Key: ImageName,
    Expires: 1000,
    ContentType: "image/jpeg",
  });
};

export const formatDataToSend = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

  return {
    accessToken,
    profile_img: user.personal_info.profile_img,
    fullName: user.personal_info.fullName,
    userName: user.personal_info.userName,
  };
};

export const generateUsername = async (email) => {
  const userName = email.split("@")[0];

  const isUserNameNotUnique = await User.exists({
    "personal_Info.userName": userName,
  }).then((result) => result);

  isUserNameNotUnique ? (userName += nanoid().substring(0, 5)) : "";

  return userName;
};
