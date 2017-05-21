// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Window, TitleBar, View } from 'react-desktop/macOs';
import Sidebar from './Sidebar';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
       <Window
        padding="0"
        background="white"
       >
          <View style={{ width: '100%' }} direction="column">
            <View style={{ height: '100%' }}>
              <Sidebar />
              {this.props.children}
            </View>
            <div className="copy">&copy; 2017 Slavik Manukyan</div>
          </View>
      </Window>
    );
  }
}
