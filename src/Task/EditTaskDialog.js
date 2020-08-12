import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { green600, grey50 } from 'material-ui/styles/colors';
import { HotKeys } from 'react-hotkeys';

class EditTaskDialog extends Component {
  state = { task: this.props.task };
  keyMap = { confirmEditTask: 'enter' };

  handleTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  }
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  handleRequestEdit = () => {
    this.props.onRequestEdit(this.state);
  }
  render() {
    const actions = [
      <FlatButton
        id="edit"
        label="Edit"
        primary
        disabled={!(this.state.task)}
        onClick={this.handleRequestEdit}
      />,
      <FlatButton
        label="取消"
        primary
        onClick={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: green600,
      color: grey50,
      cursor: 'default',
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: green600,
      },
      floatingLabelFocusStyle: {
        color: green600,
      },
    };
    const handlers = {
      confirmEditTask: () => {
        this.state.task && this.handleRequestEdit();
      },
    };
    return (
      <Dialog
        className="EditTaskDialog"
        title="Edit task"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        <p>Edit your task</p>
        <br />
        <HotKeys
          keyMap={this.keyMap}
          handlers={handlers}
        >
          <TextField
            floatingLabelText="任务标题"
            fullWidth
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            defaultValue={this.props.task}
            onChange={this.handleTaskChange}
            autoFocus
          />
        </HotKeys>
      </Dialog>
    );
  }
}

export default EditTaskDialog;
