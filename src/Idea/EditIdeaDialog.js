import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50 } from 'material-ui/styles/colors';
import { HotKeys } from 'react-hotkeys';

class EditIdeaDialog extends Component {
  state = { idea: this.props.idea };
  keyMap = { confirmEditIdea: 'enter' };

  handleIdeaChange = (e) => {
    this.setState({
      idea: e.target.value,
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
        disabled={!(this.state.idea)}
        onClick={this.handleRequestEdit}
      />,
      <FlatButton
        label="取消"
        primary
        onClick={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: yellow800,
      color: grey50,
      cursor: 'default',
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: yellow800,
      },
      floatingLabelFocusStyle: {
        color: yellow800,
      },
    };
    const handlers = {
      confirmEditIdea: () => {
        this.state.idea && this.handleRequestEdit();
      },
    };
    return (
      <Dialog
        className="EditIdeaDialog"
        title="Edit idea"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        <p>Edit you idea</p>
        <br />
        <HotKeys
          keyMap={this.keyMap}
          handlers={handlers}
        >
          <TextField
            floatingLabelText="想法标题"
            fullWidth
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            defaultValue={this.props.idea}
            onChange={this.handleIdeaChange}
            autoFocus
          />
        </HotKeys>
      </Dialog>
    );
  }
}

export default EditIdeaDialog;
