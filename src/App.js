import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Column from "./containers/Column";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class App extends Component {
  render() {
    const { columns } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <div className="container-fluid">
            <div className="row taskContainer">
              {columns.map((column, index) => {
                return <Column column={column} key={index} index={index} />;
              })}
            </div>
          </div>
        </div>
      </DndProvider>
    );
  }
}
App.propTypes = {
  columns: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired
};

App.defaultProps = {
  columns: [],
  cards: []
};
const mapStateToProps = state => {
  return {
    columns: state.columns
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);
