import React, { Component } from "react";
import PropTypes from "prop-types";
import AddCard from "../components/Card/AddCard";
import AddColumn from "../components/Column/AddColumn";
import { DropTarget } from "react-dnd";
import { DRAG_CARD } from "../store/consts";
import CardDropHolder from "../containers/CardDropHolder";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const columnTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.parentIndex === props.id) {
      return undefined;
    }

    props.shiftCard(
      {
        id: item.parentIndex,
        cardId: item.id
      },
      {
        id: props.id
      }
    );
  },
  canDrop(props) {
    return props.column.title && props.column.title.length;
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
class Column extends Component {
  handleRemoveCard = cardId => () => {
    const { removeCard, column: { id: columnId } = {} } = this.props;
    removeCard(cardId, columnId);
  };

  handleRemoveColumn = () => {
    const { removeColumn, column: { id } = {} } = this.props;
    removeColumn(id);
  };

  render() {
    const {
      connectDropTarget,
      addCard,
      addColumn,
      column: { title, cards = [], id } = {}
    } = this.props;
    return connectDropTarget(
      <div className="col-sm-2 columnBox">
        {title && <h5 className="columnTitle"> {title}</h5>}
        <div className="row">
          {cards.map((item, cardId) => {
            return (
              <CardDropHolder
                columnId={id}
                dispatch={this.props.dispatch}
                cardId={cardId}
                item={item}
                handleRemoveCard={this.handleRemoveCard(item.id)}
                parentIndex={this.props.id}
                key={cardId}
              />
            );
          })}
          {this.props.column.title ? (
            <>
              <AddCard columnId={id} addCard={addCard} />
              <button
                onClick={this.handleRemoveColumn}
                className="btn btn-danger btn-sm mt-2"
              >
                Remove this column
              </button>
            </>
          ) : (
            <AddColumn addColumn={addColumn} />
          )}
        </div>
      </div>
    );
  }
}

Column.defaultProps = {
  dispatch: undefined
};

Column.propTypes = {
  isOver: PropTypes.bool.isRequired,
  shiftCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  removeCard: (cardId, columnId) =>
    dispatch(actions.removeCard(cardId, columnId)),
  removeColumn: columnId => dispatch(actions.removeColumn(columnId)),
  addCard: (description, columnId) =>
    dispatch(actions.addCard(description, columnId)),
  addColumn: title => dispatch(actions.addColumn(title)),
  shiftCard: (src, target) => dispatch(actions.shiftCard(src, target))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(DRAG_CARD, columnTarget, collect)(Column));
