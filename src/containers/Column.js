import React, { Component } from "react";
import PropTypes from "prop-types";
import AddCard from "../components/Card/AddCard";
import AddColumn from "../components/Column/AddColumn";
import { DropTarget, DragSource } from "react-dnd";
import { findDOMNode } from "react-dom";

import CardDropHolder from "../containers/CardDropHolder";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Types = {
  COLUMN: "COLUMN"
};
//перемещение самих колонок
const ColumnSource = {
  beginDrag(props) {
    return {
      index: props.index,
      column: props.column
    };
  },
  isDragging(props, monitor) {
    return props.column.id === monitor.getItem().column.id;
  }
};
function collect1(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const ColumnTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    console.log("props", props);
    console.log("item", item);

    const dragIndex = item.index; //перетаскиваемая цель Index
    const hoverIndex = props.index;

    if (item.column.title === "" || props.column.title === "") {
      return null;
    }
    if (!component) return null;
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); //границы карты
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2; //Получить среднюю точку оси X
    const clientOffset = monitor.getClientOffset(); //Получить смещение цели перетаскивания
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return null;
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return null;
    }
    if (dragIndex !== hoverIndex) {
      props.changeColumnOrder(dragIndex, hoverIndex);
    }

    item.index = hoverIndex;
  }
};
function collect2(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
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
      isDragging,
      connectDropTarget,
      connectDragSource,
      addCard,
      addColumn,
      index,
      column: { title, cards = [], id } = {}
    } = this.props;
    let opacity = isDragging ? 0.2 : 1;
    return connectDragSource(
      connectDropTarget(
        <div className="col-sm-2 columnBox" style={{ opacity }}>
          {title && <h5 className="columnTitle"> {title}</h5>}
          <div className="row">
            {cards.map((item, cardId) => {
              return (
                <CardDropHolder
                  columnIndex={index}
                  columnId={id}
                  cardId={cardId}
                  item={item}
                  handleRemoveCard={this.handleRemoveCard(item.id)}
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
      )
    );
  }
}

Column.propTypes = {
  isOver: PropTypes.bool.isRequired,

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
  changeColumnOrder: (dragIndex, hoverIndex) =>
    dispatch(actions.changeColumnOrder(dragIndex, hoverIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource(Types.COLUMN, ColumnSource, collect1)(
    DropTarget(Types.COLUMN, ColumnTarget, collect2)(Column)
  )
);
