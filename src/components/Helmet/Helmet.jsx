import React from "react";

export const Helmet = React.memo(({ title, children }) => {
  document.title = "Multimart - " + title;

  return <div className="w-100">{children}</div>;
});
