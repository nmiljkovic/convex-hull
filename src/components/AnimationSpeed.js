import React from "react";
import {Button, ButtonGroup} from "semantic-ui-react";
import {Actions, Component} from "jumpsuit";

const AnimationSpeed = Component({
  render() {
    const speed = this.props.speed;
    return (
      <ButtonGroup fluid color="blue">
        {this.props.available.map((entry) => (
          <Button
            key={entry.speed}
            active={entry.speed === speed}
            onClick={() => Actions.changeAnimationSpeed(entry.speed)}
          >
            {entry.text}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}, (state) => ({
  speed: state.animation.speed,
  available: state.animation.available,
}));

export default AnimationSpeed;
