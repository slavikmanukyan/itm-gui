// @flow
import React, { Component } from 'react';
import {
  View,
  Label,
  Checkbox,
  TextInput,
  Button,
  ListView,
  ListViewHeader,
  ListViewFooter,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  ListViewSeparator,
  Text
} from 'react-desktop/macOs';
import _ from 'lodash';
import { remote } from 'electron';
import styles from './EditForm.scss';

type ITMConfig = {
  use_ssh?: boolean,
  destination?: string,
	ssh_user?: string,
	ssh_password?: string,
	ssh_host?: string,
	ssh_port?: number,
	ssh_private_key?: string,
	ssh_key_passphrase?: string,
	ssh_auth_sock?:      boolean,
	ignore?:  {[string]:boolean }
}

export default class EditForm extends Component {
  props: {
    data: ITMConfig
  }
  state: {
    data: ITMConfig
  }
  constructor(...args) {
    super(...args);

    this.state = {
      data: { ...this.props.data }
    };

    this.changeData = ::this.changeData;
    this.selectDestination = ::this.selectDestination;
    this.selectPrivateKey = ::this.selectPrivateKey;
    this.selectIgnore = ::this.selectIgnore;
    this.removeFile = ::this.removeFile;
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.data, this.props.data)) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  changeData(name: string, value:any) {
    console.log(value, name, this.state.data)
    console.log({ ...this.state.data, [name]: value })
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }

  selectDestination() {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (filePath) => filePath && this.changeData('destination', filePath[0]))
  }

  selectPrivateKey() {
    remote.dialog.showOpenDialog({
      properties: ['openFile'],
    }, (filePath) => filePath && this.changeData('ssh_private_key', filePath[0]))
  }

  selectIgnore() {
    remote.dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections', 'showHiddenFiles'],
    }, (filePath) => {
      if (!filePath) return;
      const ignore = { ...this.state.data.ignore };
      filePath.forEach(file => ignore[file] = true);
      this.changeData('ignore', ignore);
    })
  }

  removeFile(file) {
    const ignore = { ...this.state.data.ignore };
    delete ignore[file];
    this.changeData('ignore', ignore);
  }

  renderFile(file) {
    return (
      <ListViewRow style={{ alignItems: 'center' }} className={styles.file} key={file}> 
          <svg x="0px" y="0px" viewBox="0 0 60 60"  width="20px" height="20px">
            <g>
              <path d="M42.5,22h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,22,42.5,22z" fill="#006DF0"/>
              <path d="M17.5,16h10c0.552,0,1-0.447,1-1s-0.448-1-1-1h-10c-0.552,0-1,0.447-1,1S16.948,16,17.5,16z" fill="#006DF0"/>
              <path d="M42.5,30h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,30,42.5,30z" fill="#006DF0"/>
              <path d="M42.5,38h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,38,42.5,38z" fill="#006DF0"/>
              <path d="M42.5,46h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,46,42.5,46z" fill="#006DF0"/>
              <path d="M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z" fill="#006DF0"/>
            </g>
          </svg>
          <Text color="#414141" size="13" className={styles.filename}>{file}</Text>
          <a href="#" onClick={(e) => e.preventDefault() || this.removeFile(file)} className={styles.removefile}>X</a>
      </ListViewRow>
    );
  }


  render() {
    const { data } = this.state;
    return (
       <div className={styles['edit-form']}>
          <View direction="row">
            <Label className={styles.label} padding="5px">Use SSH: </Label>
             <View padding="5px">
                <Checkbox
                  onChange={() => { this.changeData('use_ssh', !data.use_ssh)}}
                  defaultChecked={data.use_ssh}
                />
            </View>
          </View>

           <View direction="row">
             <Label className={styles.label} padding="5px">Destination: </Label>
             {data.use_ssh ? <View className={styles.element} padding="5px">
              <TextInput
                placeholder="SSH Destination"
                defaultValue={data.destination}
                onChange={(e) => this.changeData('destination', e.target.value)}
              />
            </View> :
            <View padding="5px" className={styles.element} >
              <View height="24px" verticalAlignment="center">
                {data.destination && <Label paddingRight="10px" color="blue">{data.destination}</Label>}
                <Button onClick={this.selectDestination}>Select</Button>
              </View>
            </View>}
           </View>

          {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">SSH User: </Label>
             <View padding="5px" className={styles.element} >
              <TextInput
                 placeholder="SSH User"
                 defaultValue={data.ssh_user}
                 onChange={(e) => this.changeData('ssh_user', e.target.value)}
               />
            </View>
          </View>}

          {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">SSH Password: </Label>
             <View padding="5px" className={styles.element} >
              <TextInput
                 placeholder="SSH Password"
                 type="password"
                 defaultValue={data.ssh_password}
                 onChange={(e) => this.changeData('ssh_password', e.target.value)}
               />
            </View>
          </View>}

          {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">SSH Host: </Label>
             <View padding="5px" className={styles.element} >
              <TextInput
                 placeholder="SSH Host"
                 defaultValue={data.ssh_host}
                 onChange={(e) => this.changeData('ssh_host', e.target.value)}
               />
            </View>
          </View>}

          {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">SSH Port: </Label>
             <View padding="5px" className={styles.element} >
              <TextInput
                 placeholder="SSH Port"
                 type="number"
                 defaultValue={data.ssh_port}
                 onChange={(e) => this.changeData('ssh_port', e.target.value)}
               />
            </View>
          </View>}

          {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">SSH Private Key: </Label>
            <View padding="5px" className={styles.element} >
              <View height="24px" verticalAlignment="center">
                {data.ssh_private_key && <Label paddingRight="10px" color="blue">{data.ssh_private_key}</Label>}
                <Button onClick={this.selectPrivateKey}>Select</Button>
              </View>
            </View>
          </View>}

        {data.use_ssh && <View direction="row">
          <Label className={styles.label} padding="5px">SSH Private Key Passphrase: </Label>
            <View padding="5px" className={styles.element} >
            <TextInput
                placeholder="SSH Private Key Passphrase"
                type="password"
                defaultValue={data.ssh_key_passphrase}
                onChange={(e) => this.changeData('ssh_key_passphrase', e.target.value)}
              />
          </View>
        </View>}

         {data.use_ssh && <View direction="row">
            <Label className={styles.label} padding="5px">Use SSH Auth Socket: </Label>
             <View padding="5px">
                <Checkbox
                  onChange={() => { this.changeData('ssh_auth_sock', !data.ssh_auth_sock)}}
                  defaultChecked={data.ssh_auth_sock}
                />
            </View>
          </View>}

          <View direction="row">
            <Label className={styles.label} padding="5px">Ignore files: </Label>
            <View padding="5px" className={styles.element} >
              <View height="24px" verticalAlignment="center" direction="columns" style={{ display: 'block' }}>
                <Button onClick={this.selectIgnore}>Select</Button> 
                {data.ignore && Object.keys(data.ignore).length > 0 &&
                  <div style={{ width: '100%', border: '1px solid gray', marginTop: 5 }}>
                    <ListView height="250">
                      <ListViewSection>
                        {Object.keys(data.ignore).map(file => this.renderFile(file))}
                      </ListViewSection>
                    </ListView>
                </div>}
              </View>
            </View>
          </View>

          <View marginTop="15px" horizontalAlignment="left">
            <Button type="submit" color="blue" onClick={() => this.props.onSave(data)}>
              Save
            </Button>
          </View>
      </div>
    );
  }
}
