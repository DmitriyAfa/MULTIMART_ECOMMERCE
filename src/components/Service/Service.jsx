import React from "react";

// import styles
import "./service.css";

// reactstrap
import { Container, Row, Col } from "reactstrap";

//animation
import { motion } from "framer-motion";

// consts
import { serviceData } from "../../services/consts/serviceData";

export const Service = () => {
  return (
    <section className="service">
      <Container>
        <Row>
          {serviceData.map((item, index) => {
            const { title, subtitle, icon, bg } = item;
            return (
              <Col lg="3" md="4" key={subtitle}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="service__item"
                  style={{ background: `${bg}` }}
                >
                  <span>
                    <i class={icon}></i>
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </div>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
