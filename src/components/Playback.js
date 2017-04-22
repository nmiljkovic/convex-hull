import React from "react";
import {Actions, Component} from "jumpsuit";
import {Button, ButtonGroup} from "semantic-ui-react";
import {
  canBackwardSelector,
  canForwardSelector,
  solutionSelector
} from "../selectors";

const setStepIndex = (stepIndex) => {
  Actions.setStepIndex({
    stepIndex, stopPlaying: true,
  });
};

const Playback = Component({
  render() {
    return (
      <ButtonGroup fluid>
        <Button icon="fast backward"
                disabled={!this.props.canBackward}
                onClick={setStepIndex.bind(null, 0)}/>
        <Button icon="backward"
                disabled={!this.props.canBackward}
                onClick={setStepIndex.bind(null, this.props.stepIndex - 1)}/>
        <Button icon={this.props.isPlaying ? "pause" : "play"}
                disabled={!this.props.canForward}
                onClick={Actions.togglePlayback}/>
        <Button icon="forward"
                disabled={!this.props.canForward}
                onClick={setStepIndex.bind(null, this.props.stepIndex + 1)}/>
        <Button icon="fast forward"
                disabled={!this.props.canForward}
                onClick={setStepIndex.bind(null, this.props.lastStepIndex)}/>
      </ButtonGroup>
    );
  }
}, (state) => ({
  stepIndex: state.simulation.stepIndex,
  lastStepIndex: solutionSelector(state).length - 1,
  isPlaying: state.simulation.isPlaying,
  canForward: canForwardSelector(state),
  canBackward: canBackwardSelector(state),
}));

export default Playback;
