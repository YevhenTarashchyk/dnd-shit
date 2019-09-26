import React from "react";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "../components/Card/Card";
import * as actions from "../store/actions";
<<<<<<< HEAD
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
=======
>>>>>>> parent of e97672f... Almost finished

const cardDropTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
<<<<<<< HEAD
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
=======

    props.changeCardOrder(
      {
        columnId: item.columnId,
        cardIndex: item.id
      },
      {
        columnId: props.columnId,
        cardId: props.item.id
      }
    );
  },
  canDrop() {
    return true;
>>>>>>> parent of e97672f... Almost finished
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const CardDropHolder = ({
  isOver,
  connectDropTarget,
  item,
  handleRemoveCard,

  columnId,
  cardId
}) =>
  connectDropTarget(
    <div style={{ padding: "5px", opacity: isOver ? 0.5 : 1 }}>
      <Card
        columnId={columnId}
        createdAt={item.createdAt}
        description={item.description}
        id={cardId}
        handleRemoveCard={handleRemoveCard}
      />
    </div>
  );

CardDropHolder.propTypes = {
  isOver: PropTypes.bool.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  placeholder: initialState.placeholder
});

const mapDispatchToProps = dispatch => ({
  changeCardOrder: (source, target) =>
    dispatch(actions.changeCardOrder(source, target))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget("CARD", cardDropTarget, collect)(CardDropHolder));
