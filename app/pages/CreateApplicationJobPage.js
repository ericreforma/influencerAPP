import React, { Component } from 'react';
import { View, ScrollView, Text }  from 'react-native';
import { connect } from 'react-redux';
import style from '../styles/page.CreatePost.style';
import { BackButton, GradientButton, WhiteButton } from '../components/Button';

class CreateApplicationJobPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render = () => 
        <ScrollView>
            <BackButton darkButton={true} />
        </ScrollView>

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(CreateApplicationJobPage);
