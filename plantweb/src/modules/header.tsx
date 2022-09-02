import React from "react";
import { PATHS } from "shared/constants";
import { Tab } from "@mui/material";

interface LinkTabProps {
  label: string;
  href: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = props.href;
      }}
      {...props}
    />
  );
}

export const NavTab = () => {
  let value = 0;

  if (window.location.pathname.indexOf(PATHS.rooms) > -1) {
    value = 1;
  }

  if (window.location.pathname.indexOf(PATHS.sensors) > -1) {
    value = 2;
  }

  return {
    value,
    LinkTab,
  };
};
