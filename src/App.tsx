import ghoul, { h } from 'ghoulapp';
import * as StyleSheet from 'utils/StyleSheet';
import i18n from 'utils/i18n';
import delay from 'utils/delay';

import Page from 'components/Page';
import AppBar from 'components/AppBar';
import AppBody from 'components/AppBody';

declare var chrome;
declare var process;

const classes = StyleSheet.create({
  status: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ghoul({
  root: document.body,
  state: {
    name: 'Chrome Extension Boilerplater',
  },
  view: (state, computed, methods) => (
    <Page>
      <AppBar />
      <AppBody>
        {state.name}
      </AppBody>
    </Page>
  ),
  methods: {},
  actions: {
    'qrcode/update'(state, qrcode) {
      return { ...state, qrcode };
    },
  },
  subscriptions: {
    'setup'({ action }) {
      // chrome.tabs.getSelected(tab => {
      //   action('qrcode/update', tab.url);
      // })
    },
  },
});