// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { View } from 'react-desktop/macOs';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
        <View
          className={styles.container}
          direction="column"
          horizontalAlignment="center"
          verticalAlignment="center"
        >
          <h2>ITM</h2>
          <h5>Incremental Time Machine</h5>
        </View>
    );
  }
}
