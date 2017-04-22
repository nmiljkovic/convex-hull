import React from "react";
import * as d3 from "d3";
import {Component} from "jumpsuit";
import {Container, Grid} from "semantic-ui-react";
import {currentStateSelector} from "../selectors";

class PlaneView extends React.Component {

  componentDidMount() {
    this.renderPlane();
  }

  componentDidUpdate() {
    this.renderPlane();
  }

  render() {
    return (
      <svg ref="planeContainer"/>
    );
  }

  renderPlane() {
    const container = this.refs.planeContainer;
    const svgContainer = d3.select(container)
      .attr('width', 500)
      .attr('height', 500)
      .attr('viewBox', '0 0 400 400');

    let points = svgContainer.selectAll('circle')
      .data(this.props.points);

    points.enter()
      .append('circle')
      .merge(points)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius || 4)
      .attr('fill', 'white')
      .attr('stroke', d => d.color || 'black')
      .attr('stroke-width', 1);

    points.exit()
      .remove();

    let edges = svgContainer.selectAll('line')
      .data(this.props.edges, d => d);

    edges.enter()
      .append('line')
      .merge(edges)
      .attr('x1', d => d.start.x)
      .attr('y1', d => d.start.y)
      .attr('x2', d => d.end.x)
      .attr('y2', d => d.end.y)
      .attr('stroke-width', d => d.width || 2)
      .attr('stroke', d => d.color || 'red');

    edges.exit()
      .remove();
  }

}

const Plane = Component({
  render() {
    return (
      <Container>
        <Grid centered>
          <PlaneView
            points={this.props.points}
            edges={this.props.edges}
          />
        </Grid>
      </Container>
    );
  }
}, (state) => ({
  points: currentStateSelector(state).points,
  edges: currentStateSelector(state).edges,
}));

export default Plane;
