import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

class AddCard extends React.Component {
  state = {
    isShown: false,
    description: ""
  };

  handleCloseAddForm = () => {
    this.setState({
      isShown: false,
      description: ""
    });
  };

  handleShowAddForm = () => {
    this.setState({ isShown: true });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleAddCard = () => {
    const { addCard, columnId } = this.props;
    const { description } = this.state;
    if (description.trim().length === 0) {
      return false;
    }
    this.handleCloseAddForm();
    addCard(description, columnId);
  };
  handleKeyPress = e => {
    const { description } = this.state;
    if (e.key === "Enter" && !!description) {
      this.handleAddCard();
    }
  };
  addCard() {
    return (
      <div>
        <input
          placeholder="Enter card description"
          onChange={this.handleDescription}
          type="text"
          className="form-control"
          onKeyPress={this.handleKeyPress}
        />
        <div className="btn-group">
          <button onClick={this.handleAddCard} className="btn btn-success">
            Save
          </button>
          <button onClick={this.handleCloseAddForm} className="btn btn-success">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isShown ? (
          this.addCard()
        ) : (
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            onClick={this.handleShowAddForm}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
    );
  }
}

AddCard.defaultProps = {
  add: undefined
};

export default AddCard;
