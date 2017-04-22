import {Actions, Hook, State} from "jumpsuit";
import {canForwardSelector} from "./selectors";

export const algorithms = State({
  initial: {
    selected: "graham-scan",
    available: [
      {
        text: 'Graham Scan',
        value: 'graham-scan',
      },
      {
        text: 'Monotone Chain',
        value: 'monotone-chain',
      },
      {
        text: 'Heuristic Graham Scan',
        value: 'akl-toussaint-heuristic-graham',
      },
      {
        text: 'Heuristic Monotone Chain',
        value: 'akl-toussaint-heuristic-monotone',
      },
    ],
  },
  selectAlgorithm: (state, algorithm) => {
    return ({...state, selected: algorithm});
  }
});

export const animation = State({
  initial: {
    speed: 400,
    available: [
      {
        speed: 800,
        text: 'Slow',
      },
      {
        speed: 400,
        text: 'Normal',
      },
      {
        speed: 200,
        text: 'Fast',
      },
      {
        speed: 100,
        text: 'Very Fast',
      },
    ],
  },
  changeAnimationSpeed: (state, speed) => ({
    ...state, speed,
  })
});

export const simulation = State({
  initial: {
    points: generateRandomPoints(),
    stepIndex: 0,
  },
  generateRandomPoints: (state) => {
    const points = generateRandomPoints();
    return {
      ...state,
      stepIndex: 0,
      isPlaying: false,
      points,
    };
  },
  generateCircularPoints: (state) => {
    const points = generateCircularPoints();
    return {
      ...state,
      stepIndex: 0,
      isPlaying: false,
      points,
    };
  },
  setStepIndex: (state, {stepIndex, stopPlaying}) => {
    return {
      ...state,
      stepIndex,
      isPlaying: stopPlaying ? false : state.isPlaying,
    }
  },
  selectAlgorithm: (state) => ({
    ...state,
    stepIndex: 0,
    isPlaying: false,
  }),
  togglePlayback: (state) => ({
    ...state,
    isPlaying: !state.isPlaying,
  }),
});

Hook((action, getState) => {
  if (action.type !== 'togglePlayback') {
    return;
  }

  function play() {
    let state = getState();
    if (!state.simulation.isPlaying) {
      return;
    }

    Actions.setStepIndex({
      stepIndex: state.simulation.stepIndex + 1,
      stopPlaying: false,
    });

    if (!canForwardSelector(getState())) {
      return Actions.togglePlayback();
    }

    setTimeout(play, state.animation.speed);
  }

  play();
});

function generateRandomPoints() {
  let points = [],
    width = 300,
    topOffset = 50;

  for (let i = 0; i < 50; i++) {
    let point = {
      x: Math.floor(Math.random() * width + topOffset),
      y: Math.floor(Math.random() * width + topOffset),
    };

    points.push(point);
  }

  return points;
}

function generateCircularPoints() {
  let points = [],
    center = 200,
    pointCount = 36,
    angleDiff = 360 / pointCount;

  for (let i = 0; i < pointCount; i++) {
    let angle = 2 * Math.PI / 360 * i * angleDiff,
      point = {
        x: Math.floor(100 * Math.sin(angle) + center),
        y: Math.floor(100 * Math.cos(angle) + center),
      };

    points.push(point);
  }

  return points;
}
