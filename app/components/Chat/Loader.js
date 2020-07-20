import React from 'react';
import { ActivityIndicator, View } from 'react-native'

import styles from '../../styles/chat.Loader.style';
import theme from '../../styles/theme.style';

export default function Loader () {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={theme.COLOR_BLUE} size="small" />
    </View>
  )
}