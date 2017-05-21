// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-desktop/macOs';
import * as BackupActions from '../actions/backup';

import { remote } from 'electron';
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

class BackupPage extends Component {
    constructor(...args) {
        super(...args);
        this.onCreate = ::this.onCreate;
        this.onEdit = ::this.onEdit;
        this.onSave = ::this.onSave;
    }

    onCreate() {
        const itmPath = process.env.NODE_ENV === 'development' ? '/root/go/bin/itm' : __dirname + `/bin/itm`;
       const itm = spawn(itmPath);
        itm.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        itm.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        itm.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    onEdit() {
        remote.dialog.showOpenDialog({
            properties: ['openFile', 'showHiddenFiles'],
            defaultPath: '.itmconfig'
        }, (file) => {
            if (!file) {
                return;
            }

            fs.readFile(file[0], 'utf-8', (err, data) => {
                if (!err) {
                    this.props.fileSelected(file[0]);
                    this.props.getConfig(JSON.parse(data)); 
                }
            });
        })
    }

    onSave(data) {
        const { file } = this.props;

        if (file) {
            this.saveFile(file, JSON.stringify(data));
        } else {
            remote.dialog.showSaveDialog({
                defaultPath: '.itmconfig',
            }, (fileName) => {
                if (!fileName) {
                    return;
                }

                this.saveFile(fileName, JSON.stringify(data));
            })
        }
    }

    saveFile(file, data) {
        fs.writeFile(file, data, (err) => {
            if (!err) {
                this.props.fileSelected(file);
            }
        })
    }

  render() {
      const { editingFile, data, file } = this.props;
        return (
            <View style={{ width: '100%', padding: 25 }} horizontalAlignment="center" direction="column"> 
                <div style={{ marginBottom: 15 }}>
                    <Button color="blue" onClick={this.onCreate}>Create</Button> or <Button onClick={this.onEdit}>Edit</Button> config file
                </div>
                {file && <Text  style={{ marginBottom: 15 }} color="blue">Editing: {file}</Text>}
            </View>
      );
  }
}

function mapStateToProps(state) {
    return {
        ...state.backup,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(BackupActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupPage)