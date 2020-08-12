import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './Help.css';

import {
  navMiniWidth,
  navExpandedWidth,
} from '../lib/constants';

const versionURL = 'https://github.com/mkermani144/wanna/releases/tag/Flex-alpha';
const repoURL = 'https://github.com/mkermani144/wanna';
const licenseURL = 'https://github.com/mkermani144/wanna/blob/master/LICENSE.md';

const Help = ({ sidebarExpanded, openExternal }) => {
  const marginStyles = {
    expanded: {
      marginLeft: navExpandedWidth,
    },
    mini: {
      marginLeft: navMiniWidth,
    },
  };
  return (
    <div
      className="Help"
      style={
        sidebarExpanded ?
        marginStyles.expanded :
        marginStyles.mini
      }
    >
      <List>
        <ListItem
          primaryText="Version"
          secondaryText="Flex alpha"
          onClick={() => openExternal(versionURL)}
        />
        <Divider />
        <ListItem
          primaryText="Github repository"
          secondaryText="https://github.com/mkermani144/wanna"
          onClick={() => openExternal(repoURL)}
        />
        <Divider />
        <ListItem
          primaryText="License"
          secondaryText="MIT"
          onClick={() => openExternal(licenseURL)}
        />
        <Divider />
      </List>
    </div>
  );
};

export default Help;
