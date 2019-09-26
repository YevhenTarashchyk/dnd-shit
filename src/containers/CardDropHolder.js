import React, { Component } from "react";
import { DropTarget, DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { findDOMNode } from "react-dom";
import Card from "../components/Card/Card";
import * as actions from "../store/actions";
import cn from "classnames";
import initialState from "../store/state";

const Types = {
  CARD: "CARD"
};

const CardSource = {
  beginDrag(props) {
    return {
      id: props.item.id,
      columnId: props.columnId,
      position: props.cardId
    };
  },
  isDragging(props, monitor) {
    return props.item.id === monitor.getItem().id;
  },
  endDrag(props, monitor) {
    const didDrop = monitor.didDrop();
    if (!didDrop) {
      props.setPlaceholder(-1, -1, "", -1);
    }
  }
};
function collect1(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

// перемещение карточек между колонками !!!
const CardColumnTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const { columnId, cardId, moveCard } = props;
    console.log("props", props);
    console.log("item", item);
    const {
      placeholderIndex,
      currentDraggedColumn,
      draggedDir
    } = props.placeholder;

    if (cardId === item.position && columnId === item.columnId) {
      if (placeholderIndex > -1) {
        props.setPlaceholder(-1, -1, "", -1, -1);
      }
      return;
    }

    const draggedPosition = item.position;
    const hoverPosition = cardId;

    if (!component) return null;
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (draggedPosition < hoverPosition && hoverClientY < hoverMiddleY)
      return null;
    if (draggedPosition > hoverPosition && hoverClientY > hoverMiddleY)
      return null;

    const dragDir = hoverClientY < hoverMiddleY ? "up" : "down";

    if (
      placeholderIndex === cardId &&
      currentDraggedColumn === columnId &&
      dragDir === draggedDir
    )
      return;
    props.setPlaceholder(
      item.position,
      cardId,
      dragDir,
      columnId,
      item.columnId
    );
    if (item.id !== props.item.id) {
      moveCard(item.columnId, item.position, columnId, cardId);
    }
    item.position = hoverPosition;
  },
  drop(props, monitor) {
    const { setPlaceholder } = props;
    setPlaceholder(-1, -1, "", -1, -1);
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

class CardDropHolder extends Component {
  render() {
    const {
      connectDropTarget,
      connectDragSource,
      item,
      handleRemoveCard,
      isDragging,
      columnId,
      cardId
    } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div
          className={cn("Card", {
            "Card--dragging": isDragging
          })}
        >
          <Card
            columnId={columnId}
            createdAt={item.createdAt}
            description={item.description}
            id={cardId}
            handleRemoveCard={handleRemoveCard}
          />
        </div>
      )
    );
  }
}

CardDropHolder.propTypes = {
  handleRemoveCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  currentPlaceholder: PropTypes.number
};

const mapStateToProps = () => ({
  placeholder: initialState.placeholder
});

const mapDispatchToProps = dispatch => ({
  moveCard: (lastColumnId, lastCardPos, nextColumnId, nextCardPos) =>
    dispatch(
      actions.moveCard(lastColumnId, lastCardPos, nextColumnId, nextCardPos)
    ),
  setPlaceholder: (
    currentDragged,
    placeholderIndex,
    draggedDir,
    currentDraggedColumn,
    originColumn
  ) =>
    dispatch(
      actions.setPlaceholder(
        currentDragged,
        placeholderIndex,
        draggedDir,
        currentDraggedColumn,
        originColumn
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource(Types.CARD, CardSource, collect1)(
    DropTarget(Types.CARD, CardColumnTarget, collect2)(CardDropHolder)
  )
);
