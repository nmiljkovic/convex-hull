import React from "react";
import {Container, Grid} from "semantic-ui-react";
import Playback from "./Playback";
import AnimationSpeed from "./AnimationSpeed";

const Footer = () => (
  <Container>
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Playback/>
        </Grid.Column>
        <Grid.Column width={8}>
          <AnimationSpeed/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Footer;
