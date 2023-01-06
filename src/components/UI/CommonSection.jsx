import React from "react";

// styles
import "../../styles/common-section.css";

// reactstrap
import { Container } from "reactstrap";

export const CommonSection = React.memo(({ title }) => {
  return (
    <section className="common__section">
      <Container className="text-center">
        <h1>{title}</h1>
      </Container>
    </section>
  );
});
