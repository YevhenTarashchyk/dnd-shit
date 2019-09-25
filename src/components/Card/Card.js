import React from "react";
import PropTypes from "prop-types";

import "./card-style.css";

const Card = ({ handleRemoveCard, createdAt, description }) => {
  return (
    <div className="thumbnail">
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
  createdAt: PropTypes.number.isRequired,

  description: PropTypes.string.isRequired,
  handleRemoveCard: PropTypes.func.isRequired
};

export default Card;
