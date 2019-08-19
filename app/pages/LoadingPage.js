import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ActivityIndicator
} from 'react-native';
import {
    LabelText
} from '../components/Text';
import lang from '../assets/language/Main';
import theme from '../styles/theme.style';

export default class LoadingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false
        };
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({loader: true}), 1000)
        setTimeout(() => {this.props.navigation.navigate('Landing');}, 6000);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.COLOR_BLACK
                }}
            >
                <Image source={require('../assets/image/app_icon.png')} />

                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 20
                    }}
                >
                    <LabelText
                        size="large"
                        dark={false}
                        white={true}
                        text={lang.appName}
                    />
                </View>

                {this.state.loader ? (
                    <ActivityIndicator color={theme.COLOR_WHITE} size="large" />
                ) : null}
            </View>
        )
    }
}
