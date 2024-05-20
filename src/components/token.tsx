import React from "react";

interface Token {
  accessToken: string;
  onAccessToken: (v: string) => void;
  refreshToken: string;
  onRefreshToken: (v: string) => void;
  onIssuedToken: () => void;
}

function Token({
  accessToken,
  onAccessToken,
  refreshToken,
  onRefreshToken,
  onIssuedToken,
}: Token) {
  return (
    <div className="flex gap-5">
      <button
        type="button"
        className="basis-[15%] py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={onIssuedToken}
      >
        Token 발급
      </button>
      <div className="flex-grow flex flex-col gap-5">
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Access Token(1 day)
          </label>
          <textarea
            id="message"
            rows={5}
            defaultValue={accessToken}
            onChange={(e) => onAccessToken(e.target.value)}
            className="w-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Refresh Token(14 days)
          </label>
          <textarea
            id="message"
            rows={5}
            defaultValue={refreshToken}
            onChange={(e) => onRefreshToken(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Token);
