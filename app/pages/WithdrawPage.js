import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import theme from '../styles/theme.style';
import { navOptionsDark } from '../components/Header';

export default class WithdrawPage extends Component {
    static navigationOptions = navOptionsDark;

    constructor(props) {
        super(props);
    }

    render = () =>
        <View 
            style={{ 
                flex: 1, 
                backgroundColor: theme.COLOR_BLACK, 
                paddingHorizontal: theme.HORIZONTAL_PADDING
            }}
        >
            <ScrollView>
                <Text>WithDraw</Text>
            </ScrollView>
        </View>

}