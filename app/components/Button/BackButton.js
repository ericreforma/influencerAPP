import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import theme from '../../styles/theme.style';
import { withNavigation } from 'react-navigation';

class BackButton extends Component {
  render = () =>
    <View>
      <TouchableOpacity style={{ 
          width: 18,
          height: 18,
          marginTop: 25,
          marginRight: 25,
          marginLeft: 25,
          marginBottom: 25,
          justifyContent: 'center',
          alignItems: 'center'
         }} 
          onPress={() => this.props.navigation.goBack()}
      >
        <Image
          style={{
            width: 18,
            height: 18
          }}
          resizeMode="contain"
          source={this.props.darkButton ? theme.backIconDark : theme.backIcon}
        />
      </TouchableOpacity>
    </View>
}

export default withNavigation(BackButton);