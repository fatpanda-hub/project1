import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { yellow800, grey50} from 'material-ui/styles/colors';
import { HotKeys} from 'react-hotkeys';

class NewIdeaDialog extends Component {
    state ={idea: ''};
    keyMap ={
        confirmAddNewIdeaAndFinish: 'shift+enter',
        confirmAddNewIdeaAndContine: 'enter',
    };

    handleIdeaChange =(e) =>{
        this.setState({
            idea: e.target.value,
        });
    }
    handleRequestClose =() =>{
        this.setState({idea: ''});
        this.props.onRequestClose();
    }
    handleRequestAdd =() =>{
        this.props.onRequestAdd(this.state);
        this.setState({ idea: ''});
    }
    handleRequestFinish =() =>{
        this.handleRequestAdd();
        this.handleRequestClose();
    }
    render() {
        const actions =[
            <FlatButton
            id= "add-and-finish"
            label= "完成添加"
            primary
            disabled= {!(this.state.idea)}
            onClick= {this.handleRequestFinish}
            />,
            <FlatButton
            id= "add-and-continue"
            label= "继续添加"
            primary
            disabled= {!(this.state.idea)}
            onClick= {this.handleRequestAdd}
            />,
            <FlatButton
            label= "取消"
            primary
            onClick= {this.handleRequestClose}
            />,
        ];
        const dialogTitleStyle ={
            backgroundColor: yellow800,
            color: grey50,
            cursor: 'default',
        };
        const textFieldStyles ={
            underlineFocusStyle: {
                borderColor: yellow800,
            },
            floatingLableFocusStyle: {
                color: yellow800,
            },
        };
        const handlers= {
            confirmAddNewIdeaAndFinish: ()=> {
                this.state.idea && this.handleRequestFinish();
            },
            confirmAddNewIdeaAndContine: ()=> {
                this.state.idea && this.handleRequestAdd();
            },
        };
        return (
            <Dialog
            className= "NewIdeaDialog"
            title= "添加一个新想法"
            actions= {actions}
            titleStyle= {dialogTitleStyle}
            open= {this.props.open}
            onRequestClose= {this.props.onRequestClose}
            >
              <br />
              <p>你有新想法吗？</p>
              <br />
              <HotKeys
              keyMap ={this.keyMap}
              handlers ={handlers}  
              >
               <TextField 
               floatingLabelText= "想法标题"
               fullWidth
               underlineFocusStyle={textFieldStyles.underlineFocusStyle}
               floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
               value={this.state.idea}
               onChange={this.handleIdeaChange}
               autoFocus
               />   
              </HotKeys>
            </Dialog>
        );
    }
}

export default NewIdeaDialog;