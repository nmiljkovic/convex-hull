import React from "react";
import {Actions, Component} from "jumpsuit";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Grid
} from "semantic-ui-react";

const selectAlgorithm = (_, {value}) => {
  Actions.selectAlgorithm(value);
};

const Header = Component({
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Dropdown placeholder="Select algorithm" fluid selection
                        options={this.props.algorithms}
                        value={this.props.selectedAlgorithm}
                        onChange={selectAlgorithm}/>
            </Grid.Column>
            <Grid.Column width={4}/>
            <Grid.Column width={8}>
              <ButtonGroup fluid>
                <Button onClick={Actions.generateRandomPoints}>
                  Randomize
                </Button>
                <Button onClick={Actions.generateCircularPoints}>
                  Circle
                </Button>
              </ButtonGroup>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}, (state) => ({
  algorithms: state.algorithms.available,
  selectedAlgorithm: state.algorithms.selected,
}));

export default Header;
