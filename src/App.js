import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { blue500, green800, pink300 } from 'material-ui/styles/colors';
import { HotKeys } from 'react-hotkeys';

import store from './store';
import SidebarContainer from './Sidebar';
import FABContainer from './FAB';
import TaskListContainer from './Task';
import IdeaListContainer from './Idea';
import SettingsContainer from './Settings';
import Help from './Help';

import { update } from './lib/datebase';

import './App.css';

injectTapEventPlugin();

class App extends Component {
  state = {
    toTasks: false,
    toIdeas: false,
    toSettings: false,
    toHelp: false,
    sidebarExpanded: false,
  };
  keyMap = {
    showTasks: 'shift+t',
    showIdeas: 'shift+i',
    showSettings: 'shift+s',
    showHelp: 'shift+h',
  };

  handleSidebarToggle = () => {
    this.setState(prevState => ({ sidebarExpanded: !prevState.sidebarExpanded }));
  }
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500,
      },
      datePicker: {
        selectColor: green800,
        headerColor: green800,
      },
      snackbar: {
        actionColor: pink300,
      },
    });
    store.subscribe(() => {
      update(store.getState());
    });
    const handlers = {
      showTasks: () => {
        this.props.changeTab('tasks');
        this.setState({
          toTasks: true,
        }, () => {
          this.setState({
            toTasks: false,
          });
        });
      },
      showIdeas: () => {
        this.props.changeTab('ideas');
        this.setState({
          toIdeas: true,
        }, () => {
          this.setState({
            toIdeas: false,
          });
        });
      },
      showSettings: () => {
        this.props.changeTab('settings');
        this.setState({
          toSettings: true,
        }, () => {
          this.setState({
            toSettings: false,
          });
        });
      },
      showHelp: () => {
        this.props.changeTab('help');
        this.setState({
          toHelp: true,
        }, () => {
          this.setState({
            toHelp: false,
          });
        });
      },
    };
    return (
      <Provider store={store}>
        <HotKeys
          focused
          attach={window}
          keyMap={this.keyMap}
          handlers={handlers}
        >
          <Router>
            <MuiThemeProvider muiTheme={muiTheme}>
              <div className="App">
                <AppBar
                  className="AppBar"
                  title="事情"
                  onLeftIconButtonClick={this.handleSidebarToggle}
                />
                <div className="main">
                  <SidebarContainer expanded={this.state.sidebarExpanded} />
                  <FABContainer
                    window={window}
                    width={document.body.clientWidth}
                  />
                  <Redirect from="/" to={`/${this.props.currentTab}`} />
                  {this.state.toTasks &&
                    <Redirect to="/tasks" />
                  }
                  {this.state.toIdeas &&
                    <Redirect to="/ideas" />
                  }
                  {this.state.toSettings &&
                    <Redirect to="/settings" />
                  }
                  {this.state.toHelp &&
                    <Redirect to="/help" />
                  }
                  <Route
                    path="/tasks"
                    render={() =>
                      (<TaskListContainer sidebarExpanded={this.state.sidebarExpanded} />)
                    }
                  />
                  <Route
                    path="/ideas"
                    render={() =>
                      (<IdeaListContainer sidebarExpanded={this.state.sidebarExpanded} />)
                    }
                  />
                  <Route
                    path="/settings"
                    render={() =>
                      (<SettingsContainer sidebarExpanded={this.state.sidebarExpanded} />)
                    }
                  />
                  <Route
                    path="/help"
                    render={() =>
                      (
                        <Help
                          openExternal={window.require('electron').shell.openExternal}
                          sidebarExpanded={this.state.sidebarExpanded}
                        />
                      )
                    }
                  />
                </div>
              </div>
            </MuiThemeProvider>
          </Router>
        </HotKeys>
      </Provider>
    );
  }
}

export default App;
