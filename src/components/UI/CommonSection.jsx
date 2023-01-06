import React from "react";

// styles
import "../../styles/common-section.scss";

// reactstrap
import { Container } from "reactstrap";

export const CommonSection = React.memo(({ title }) => {
  return (
    <section className="common-section">
      <Container className="text-center">
        <h1>{title}</h1>
      </Container>
    </section>
  );
});
