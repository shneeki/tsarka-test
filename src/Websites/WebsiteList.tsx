import * as React from "react";
import { string } from "yup";

interface IWebsiteList {
  items: { host: string; id: number }[];
}
const WebsiteList = ({ items }: IWebsiteList) => {
  return (
    <ol>
      {items.map((item) => (
        <li key={item.id}>{item.host}</li>
      ))}
    </ol>
  );
};
export default WebsiteList;
