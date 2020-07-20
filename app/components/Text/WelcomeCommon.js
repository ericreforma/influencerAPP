import React from 'react';
import { Text } from 'react-native';
import styles from '../../styles/component.Text.style';

const WelcomeCommon = props => (
    <Text selectable style={styles.welcomeCommonText}>
        {props.text}
    </Text>
);

export default WelcomeCommon;
