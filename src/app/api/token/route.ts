import TokenModel from "@/service/token";
import { TokenType } from "@/types";
import {
  makeRefreshToken,
  makeToken,
  refreshVerify,
  verify,
} from "@/utils/token";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const reqJson: TokenType = JSON.parse(reqData);
  const token = makeToken(reqJson);
  const refreshToken = makeRefreshToken(reqJson);

  const hasRefreshToken = await TokenModel.findToken(reqJson.user.userName);
  if (hasRefreshToken) {
    TokenModel.updateRefreshToken(reqJson.user.userName, refreshToken);
  }
  await TokenModel.updateRefreshToken(reqJson.user.userName, refreshToken);

  return new Response(
    JSON.stringify({ accessToken: token, refreshToken: refreshToken }),
    {
      status: 200,
    }
  );
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("Authorization");
  const refreshToken = req.headers.get("RefreshToken");
  if (!token || !refreshToken)
    return new Response(
      "Access token and refresh token are need for refresh!",
      {
        status: 400,
      }
    );

  // access token 디코딩하여 userId를 가져옴.
  const decoded = jwt.decode(token);

  // 디코딩한 결과가 없으면 권한이 없음을 응답.
  if (!decoded) {
    return new Response("권한이 없습니다.", {
      status: 401,
    });
  }

  // access token 검증 -> expired이어야 함.
  const authResult = verify(token);

  // acccess token의 decoding된 값에서 유저의 id를 가져와 refresh token을 검증
  const refreshResult = await refreshVerify(
    refreshToken,
    (decoded as TokenType)?.user?.userName
  );
  console.log(authResult, refreshResult);
  // // 재발급을 위해서는 access token이 만료되어 있어야함.
  if (authResult.ok === false) {
    // 1. access token이 만료되고 refresh token도 만료된 경우 -> 새로 로그인
    if (refreshResult === false) {
      return new Response("No authorized! 다시 로그인 해주세요.", {
        status: 401,
      });
    } else {
      const newAccessToken = makeToken(decoded as TokenType);
      return new Response(
        JSON.stringify({
          accessToken: newAccessToken,
          refreshToken,
        }),
        {
          status: 200,
        }
      );
    }
  } else {
    // 3. access token이 만료되지 않은 경우 => refresh 할 필요없음
    return new Response("Access token is not expired!", { status: 400 });
  }
}
