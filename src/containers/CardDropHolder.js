import React from "react";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { ItemTypes } from "../store/consts";
import Card from "../components/Card/Card";
import { swapCard } from "../store/actions";

const cardDropTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const data = {
      src: {
        columnId: item.parentIndex,
        cardId: item.id
      },
      target: {
        columnId: props.parentIndex,
        cardId: props.id
      }
    };
    swapCard(data.src, data.target);
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
  id,
  parentIndex
}) =>
  connectDropTarget(
    <div style={{ padding: "5px", opacity: isOver ? 0.5 : 1 }}>
      <Card
        createdAt={item.createdAt}
        description={item.description}
        id={id}
        parentIndex={parentIndex}
        handleRemoveCard={handleRemoveCard}
      />
    </div>
  );

CardDropHolder.defaultProps = {
  id: undefined,
  parentIndex: undefined
};
CardDropHolder.propTypes = {
  isOver: PropTypes.bool.isRequired,

  handleRemoveCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
// export default DropTarget(ItemTypes.CARD, cardDropTarget, collect)(
//   CardDropHolder
// );
