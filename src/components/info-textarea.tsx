import React from "react";

interface InfoTextarea {
  tokenInfo: string;
  onTokenInfo: (v: string) => void;
}
function InfoTextarea({ tokenInfo, onTokenInfo }: InfoTextarea) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        JWT에 들어갈 JSON
      </label>
      <textarea
        id="message"
        rows={20}
        defaultValue={tokenInfo}
        onChange={(e) => onTokenInfo(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}

export default React.memo(InfoTextarea);
