import React from "react";
import { PATHS } from "shared/constants";
import { Tab } from "@mui/material";
import AppHeaderNavLink, {
  NavLink,
} from "components/app-header-nav-link/app-header-nav-link";

// define our AppHeader properties that will be passed into the component
export type AppHeaderProps = {
  title: string;
  description: string;
  links: NavLink[];
};

// create React Functional Component variable that will render code for the header.
// React.FC takes a type of the props that can be passed into the component
const AppHeader: React.FC<AppHeaderProps> = React.memo(
  ({ title, description, links }) => {
    return (
      <header className="app-header">
        <section className="app-title">
          <h1>{title}</h1>
          <small>{description}</small>
        </section>
        <span className="fill-space" />
        <section className="app-links">
          {links &&
            links.map((link: NavLink) => (
              <AppHeaderNavLink
                label={link.label}
                route={link.route}
                key={link.label}
              />
            ))}
        </section>
      </header>
    );
  }
);

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
    AppHeader,
    LinkTab,
  };
};
