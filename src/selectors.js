import {createSelector} from "reselect";
import solveGraham from "./solver/graham-scan";
import solveMonotoneChain from "./solver/monotone-chain";
import {
  solveAklToussaintHeuristicGraham,
  solveAklToussaintHeuristicMonotoneChain
} from "./solver/akl-toussaint-heuristic";

export const solutionSelector = createSelector(
  (state) => state.simulation.points,
  (state) => state.algorithms.selected,
  (points, selectedAlgorithm) => {
    switch (selectedAlgorithm) {
      case 'graham-scan':
        return solveGraham(points);
      case 'monotone-chain':
        return solveMonotoneChain(points);
      case 'akl-toussaint-heuristic-graham':
        return solveAklToussaintHeuristicGraham(points);
      case 'akl-toussaint-heuristic-monotone':
        return solveAklToussaintHeuristicMonotoneChain(points);
      default:
        return solveGraham(points);
    }
  }
);

const stepIndexSelector = (state) => state.simulation.stepIndex;

export const currentStateSelector = createSelector(
  solutionSelector,
  stepIndexSelector,
  (solution, stepIndex) => solution[stepIndex],
);

export const canBackwardSelector = createSelector(
  stepIndexSelector,
  (stepIndex) => (
    stepIndex > 0
  ),
);

export const canForwardSelector = createSelector(
  solutionSelector,
  stepIndexSelector,
  (solution, stepIndex) => (
    stepIndex < solution.length - 1
  ),
);
