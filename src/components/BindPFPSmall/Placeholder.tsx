import ContentLoader from "react-content-loader";
import React from "react";

export const PickListPlaceholder: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={522}
    height={189}
    viewBox="0 0 522 189"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="41" cy="41" r="30" />
    <circle cx="41" cy="120" r="30" />
    <circle cx="121" cy="41" r="30" />
    <circle cx="121" cy="120" r="30" />
    <circle cx="201" cy="41" r="30" />
    <circle cx="201" cy="120" r="30" />
    <circle cx="281" cy="41" r="30" />
    <circle cx="281" cy="120" r="30" />
    <circle cx="361" cy="41" r="30" />
    <circle cx="361" cy="120" r="30" />
  </ContentLoader>
);
