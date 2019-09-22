import React from "react";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "../components/Card/Card";
import * as actions from "../store/actions";

const cardDropTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changeCardOrder: (source, target) =>
    dispatch(actions.changeCardOrder(source, target))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget("CARD", cardDropTarget, collect)(CardDropHolder));
