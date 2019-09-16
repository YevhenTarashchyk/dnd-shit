import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { ItemTypes } from "../../store/consts";
import "./card-style.css";

const Card = ({
  handleRemoveCard,
  createdAt,
  description,
  id,
  connectDragSource
}) => {
  return connectDragSource(
    <div
      id={id}
      className="thumbnail"
      // style={{
      //   opacity: isDragging ? 0.0 : 1
      // }}
    >
      <div className="px-2 pt-2">
        <div className="col-lg-12 well well-add-card">
          <h6 className="m-0">{description}</h6>
        </div>
        <div className="col-lg-12 text-dark">
          <p
            style={{
              fontSize: "12px"
            }}
          >
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <button
        onClick={handleRemoveCard}
        type="button"
        className="btn btn-primary btn-sm"
      >
        Remove
      </button>
    </div>
  );
};

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  createdAt: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  handleRemoveCard: PropTypes.func.isRequired
};

const cardDragSource = {
  beginDrag: function(props) {
    return {
      id: props.id,
      position: props.position
    };
  }
};

const cardDropTarget = {
  hover: function(props, monitor, component) {
    const item = monitor.getItem();
    const draggedPosition = item.position;
    const hoverPosition = props.position;

    // find the middle of things
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // don't move until we are halfway over the card
    if (draggedPosition < hoverPosition && hoverClientY < hoverMiddleY) return;
    if (draggedPosition > hoverPosition && hoverClientY > hoverMiddleY) return;

    // insert a display placeholder at an appropriate position
    const dragDir = draggedPosition > hoverPosition ? "up" : "down";
    props.setPlaceholder(draggedPosition, hoverPosition, dragDir);
  }
};

export default DragSource(ItemTypes.DRAG_CARD, cardDragSource, function(
  connect
) {
  return {
    connectDragSource: connect.dragSource()
  };
})(Card);
