import React from "react";

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      description: ""
    };
  }

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
    if (!description || !description.length) {
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
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleShowAddForm}
          >
            Add a Card
          </button>
        )}
      </div>
    );
  }
}

AddCard.defaultProps = {
  add: undefined
};

export default AddCard;
