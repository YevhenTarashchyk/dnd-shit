import React from "react";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import "./card-style.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const CardSource = {
  beginDrag(props) {
    return props;
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

// перемещение карточек между колонками !!!
const CardColumnTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    console.log("props", props);
    console.log("item", item);
    if (item.columnId === props.columnId) {
      return undefined;
    }

    props.changeCardColumn(
      {
        index: item.parentIndex,
        cardIndex: item.id
      },
      {
        index: props.index
      }
    );
  },
  canDrop(props) {
    const { column: { title } = {} } = props;
    return title && title.length;
  }
};
function collect1(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Card = ({
  handleRemoveCard,
  createdAt,
  description,
  connectDragSource,
  connectDropTarget,
  isDragging
}) => {
  return connectDragSource(
    connectDropTarget(
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
    )
  );
};

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createdAt: PropTypes.number.isRequired,

  description: PropTypes.string.isRequired,
  handleRemoveCard: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changeCardColumn: (source, targetColumnId) =>
    dispatch(actions.changeCardColumn(source, targetColumnId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource("CARD", CardSource, collect)(
    DropTarget("CARD", CardColumnTarget, collect1)(Card)
  )
);
