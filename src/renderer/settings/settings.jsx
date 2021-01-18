import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';

import Settings from '../../addons/settings/settings.jsx';
import SettingsStore from '../../addons/settings-store';

const onReloadNow = () => {
  ipcRenderer.send('reload-all');
};

let timeout = null;
const onSettingsChanged = () => {
  if (timeout === null) {
    timeout = setTimeout(() => {
      ipcRenderer.send('addon-settings-changed', SettingsStore.store);
      timeout = null;
    }, 100);
  }
};

ReactDOM.render((
  <Settings
    onReloadNow={onReloadNow}
    onSettingsChanged={onSettingsChanged}
  />
), require('../app-target'));
