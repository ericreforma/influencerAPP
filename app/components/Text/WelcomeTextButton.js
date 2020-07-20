import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/component.Text.style';

const WelcomeTextButton = props => (
    <TouchableOpacity
        onPress={props.onPress}
    >
        <Text
            selectable
            style={styles.welcomeTextButton}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);

export default WelcomeTextButton;
