import * as React from "react";

interface IWebsiteList {
  items: { host: string; id: number }[];
}
const WebsiteList = ({ items }: IWebsiteList) => {
  return (
    <div className="flex items-center justify-center rounded shadow-lg border-2 border-black bg-white max-w-xs md:max-w-md lg:max-w-3xl  mx-auto">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="text-3xl">
            {item.host}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WebsiteList;
