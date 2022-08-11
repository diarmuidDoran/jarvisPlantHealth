import React from 'react';

// define a Navigation Link type for our links
export type NavLink = {
  label: string;
  route: string;
};

const AppHeaderNavLink: React.FC<NavLink> = React.memo(({ label }) => (
  <span className="nav-link">{label}</span>
));

export default AppHeaderNavLink;