import { tokenInfo } from "@/data";
import TokenModel from "@/service/token";
import { TokenType } from "@/types";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_SESSION_SECRET || "3S9rr3wnE8J9R1cnc8fWWkmh8mQ4bwIm";
export const makeToken = (obj: TokenType) => {
  if (obj.iat) delete obj.iat;
  if (obj.exp) delete obj.exp;
  const token = jwt.sign(obj, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

export const makeRefreshToken = (obj: TokenType) => {
  if (obj.iat) delete obj.iat;
  if (obj.exp) delete obj.exp;
  const refreshToken = jwt.sign(obj, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
  return refreshToken;
};

// access token 유효성 검사
export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      ok: true,
      userName: (decoded as TokenType).user.userName,
    };
  } catch (error) {
    return {
      ok: false,
      message: error,
    };
  }
};

// refresh token 유효성 검사
export const refreshVerify = async (token: string, userName: string) => {
  try {
    // db에서 refresh token 가져오기
    const refreshToken = await TokenModel.findToken(userName);
    if (token === refreshToken.refreshToken) {
      try {
        jwt.verify(token, SECRET_KEY);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
