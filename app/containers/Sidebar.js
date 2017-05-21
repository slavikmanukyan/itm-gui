import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { View, Text } from 'react-desktop/macOs';

class Sidebar extends Component {
    render() {
        return (
            <View direction="column" className="sidebar" >
                <View
                    height="20%"
                    horizontalAlignment="center"
                    style={{ alignItems: 'flex-end', marginBottom: 5, borderBottom: '1px ridge grey' }}
                >
                    <Text>ITM Menu</Text>
                </View>
                <Link to="/editform">
                    <div className="sidebar-item">Edit Config</div>
                </Link>
                <Link to="/backup">
                    <div className="sidebar-item">Backup</div>
                </Link>
            </View>
        );
    }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(Sidebar);
