// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-desktop/macOs';
import EditForm from '../components/EditForm/EditForm';
import * as ConfigActions from '../actions/config';

import { remote } from 'electron';
import fs from 'fs';

class ConfigPage extends Component {
    constructor(...args) {
        super(...args);
        this.onCreate = ::this.onCreate;
        this.onEdit = ::this.onEdit;
        this.onSave = ::this.onSave;
    }

    onCreate() {
        this.props.fileSelected();
        if (this.props.file) {
            this.props.reset();
        }
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
                {editingFile && <EditForm data={data} onSave={this.onSave} />}
            </View>
      );
  }
}

function mapStateToProps(state) {
    return {
        ...state.config,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)