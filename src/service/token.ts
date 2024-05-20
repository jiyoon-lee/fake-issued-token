import fs from "fs";
import path from "path";

interface DataType {
  userName: string;
  refreshToken: string;
}

export default class TokenModel {
  static async findToken(userName: string) {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "public",
      "data.json"
    );
    const tokenList = fs.readFileSync(filePath, "utf8");
    if (!tokenList) return;
    const tokenListJson = JSON.parse(tokenList);
    return tokenListJson.find((token: DataType) => token.userName === userName);
  }
  static async updateRefreshToken(userName: string, refreshToken: string) {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "public",
      "data.json"
    );
    const tokenList = fs.readFileSync(filePath, "utf8");
    const tokenListJson = tokenList ? JSON.parse(tokenList) : [];
    const hasToken = tokenListJson.find(
      (token: DataType) => token.userName === userName
    );
    let tempTokenList = [...tokenListJson, { userName, refreshToken }];
    if (hasToken)
      tempTokenList = tokenListJson.map((v: DataType) => {
        if (v.userName === userName) return { userName, refreshToken };
        else return v;
      });
    return fs.writeFileSync(
      path.join(__dirname, "..", "..", "..", "..", "..", "public", "data.json"),
      JSON.stringify(tempTokenList)
    );
  }
}
