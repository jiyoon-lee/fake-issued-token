"use client";

import InfoTextarea from "@/components/info-textarea";
import Redirect from "@/components/redirect";
import Token from "@/components/token";
import {
  tokenInfo as defaultTokenInfo,
  redirectUrl as defaultRedirectUrl,
} from "@/data";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [tokenInfo, setTokenInfo] = useState<string>(
    JSON.stringify(defaultTokenInfo)
  );
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string>(defaultRedirectUrl);
  const [addParameter, setAddParameter] = useState<string>("");

  useEffect(() => {
    if (accessToken && refreshToken) {
      setAddParameter(
        `access_token=${accessToken}&refresh_token=${refreshToken}`
      );
    }
  }, [accessToken, refreshToken]);

  const handleTokenInfo = useCallback(
    (info: string) => setTokenInfo(info),
    [setTokenInfo]
  );
  const handleAccessToken = useCallback(
    (info: string) => setAccessToken(info),
    [setAccessToken]
  );
  const handleRefreshToken = useCallback(
    (info: string) => setRefreshToken(info),
    [setRefreshToken]
  );
  const handleRedirectUrl = useCallback(
    (info: string) => setRedirectUrl(info),
    [setRedirectUrl]
  );
  const handleAddParameter = useCallback(
    (info: string) => setAddParameter(info),
    [setAddParameter]
  );

  const handleIssuedToken = useCallback(async () => {
    const res = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tokenInfo),
    });
    const token = await res.json();
    token?.access_token && setAccessToken(token.access_token);
    token?.refresh_token && setRefreshToken(token.refresh_token);
  }, [tokenInfo]);

  const handleRedirect = useCallback(() => {
    const url = `${redirectUrl}?${addParameter}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [redirectUrl, addParameter]);

  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <h1 className="font-semibold text-3xl text-white mb-10">
        SWAT 대체 토큰 발급용 페이지
      </h1>
      <div className="w-4/5 h-4/5 flex gap-5">
        <div className="basis-[30%] flex-shrink-0">
          <InfoTextarea tokenInfo={tokenInfo} onTokenInfo={handleTokenInfo} />
        </div>
        <div className="flex-grow flex-shrink-0 flex flex-col gap-5 items-stretch">
          <Token
            accessToken={accessToken}
            onAccessToken={handleAccessToken}
            refreshToken={refreshToken}
            onRefreshToken={handleRefreshToken}
            onIssuedToken={handleIssuedToken}
          />
          <Redirect
            redirectUrl={redirectUrl}
            onRedirectUrl={handleRedirectUrl}
            addParameter={addParameter}
            onAddParameter={handleAddParameter}
            onRedirect={handleRedirect}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
