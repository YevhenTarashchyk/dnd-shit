import React, { Component } from "react";

class AddColumn extends Component {
  state = {
    columnName: "",
    showAddColumnForm: false
  };

  handleShowAddForm = () => {
    this.setState({
      showAddColumnForm: true
    });
  };

  handleCloseAddForm = () => {
    this.setState({
      showAddColumnForm: false,
      columnName: ""
    });
  };

  handleColumnName = event => {
    this.setState({
      columnName: event.target.value
    });
  };

  handleAddColumn = () => {
    const { addColumn } = this.props;
    const { columnName } = this.state;
    if (!columnName || !columnName.length) {
      return false;
    }
    addColumn(columnName);
  };
  handleKeyPress = e => {
    const { columnName } = this.state;
    if (e.key === "Enter" && !!columnName) {
      this.handleAddColumn();
    }
  };
  addColumn = () => {
    return (
      <div>
        <input
          placeholder="Enter column name"
          onChange={this.handleColumnName}
          type="text"
          className="form-control"
          onKeyPress={this.handleKeyPress}
        />
        <div className="btn-group">
          <button onClick={this.handleAddColumn} className="btn btn-success">
            Save
          </button>
          <button onClick={this.handleCloseAddForm} className="btn btn-success">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { showAddColumnForm } = this.state;
    return (
      <div className="addBox">
        {showAddColumnForm ? (
          this.addColumn()
        ) : (
          <button className="btn btn-primary" onClick={this.handleShowAddForm}>
            Add a list
          </button>
        )}
      </div>
    );
  }
}

AddColumn.defaultProps = {
  saveColumn: undefined
};

export default AddColumn;
