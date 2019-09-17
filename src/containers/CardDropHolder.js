import React from "react";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { DRAG_CARD } from "../store/consts";
import Card from "../components/Card/Card";
import * as actions from "../store/actions";
import { connect } from "react-redux";

const cardDropTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    console.log(props, "props");
    console.log(item, "item");
    // console.log(item.parentIndex, item.id, props.parentIndex, props.id);
    props.swapCard(item.columnId, item.cardId, props.columnId, props.cardId);
  },
  canDrop() {
    return true;
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
  index,
  parentIndex,
  columnId,
  cardId
}) =>
  connectDropTarget(
    <div style={{ padding: "5px", opacity: isOver ? 0.5 : 1 }}>
      <Card
        columnId={columnId}
        cardId={cardId}
        createdAt={item.createdAt}
        description={item.description}
        index={index}
        parentIndex={parentIndex}
        handleRemoveCard={handleRemoveCard}
      />
    </div>
  );

CardDropHolder.propTypes = {
  isOver: PropTypes.bool.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  swapCard: (srcColumnId, srcCardId, targetColumnId, targetCardId) =>
    dispatch(
      actions.swapCard(srcColumnId, srcCardId, targetColumnId, targetCardId)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(DRAG_CARD, cardDropTarget, collect)(CardDropHolder));
