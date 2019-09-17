import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { DRAG_CARD } from "../../store/consts";
import "./card-style.css";

const CardSource = {
  beginDrag(props) {
    console.log(props);
    return props;
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
const Card = ({
  handleRemoveCard,
  createdAt,
  description,
  connectDragSource,
  isDragging
}) => {
  return connectDragSource(
    <div
      className="thumbnail"
      style={{
        opacity: isDragging ? 0.0 : 1
      }}
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

Card.defaultProps = {
  parentIndex: undefined,
  index: undefined
};
Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createdAt: PropTypes.number.isRequired,

  description: PropTypes.string.isRequired,
  handleRemoveCard: PropTypes.func.isRequired
};

export default DragSource(DRAG_CARD, CardSource, collect)(Card);
