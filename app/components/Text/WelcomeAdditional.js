import React from 'react';
import { Text } from 'react-native';
import styles from '../../styles/component.Text.style';

const WelcomeAdditional = props => (
    <Text selectable style={styles.welcomeAdditionalText}> 
        {props.text}
    </Text>
);

export default WelcomeAdditional;
