import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Page extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                
                {this.props.children}
            </View>
           
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Page);
