import * as React from "react";
import { useWebsiteQuery } from "../Login/Apollo/WebsiteQuery";
import WebsiteList from "./WebsiteList";

const WebsitesPage = () => {
  const { loading, data } = useWebsiteQuery();

  const items = data?.viewer?.sites;

  return <WebsiteList items={items ? [...items] : []} />;
};
export default WebsitesPage;
