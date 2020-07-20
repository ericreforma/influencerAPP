import React from 'react';
import { Text } from 'react-native';
import styles from '../../styles/component.Text.style';

const WelcomeLabel = (props) => (
  <Text
    selectable
    style={[
        (
            props.xlarge
            ? styles.welcomeLabelXLarge
            : styles.welcomeLabelLarge
        ),
        styles.welcomeLabel
    ]}
  >
    {props.text}
  </Text>
);

export default WelcomeLabel;
