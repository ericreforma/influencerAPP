import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import style from '../styles/component.Card.style';
import SocMedIcon from '../components/SocMedIcon';

class CardHome extends Component {
    render() {
        return (
            <View style={style.cardContainer}>
                <View
                    style={[
                        style.cardHeaderContainer,
                        style.cardBorderTop,
                        style.cardHeaderHeight
                    ]}
                >
                    <Image
                        style={[
                            style.cardHeaderImage,
                            style.cardBorderTop,
                            style.cardHeaderHeight
                        ]}
                        source={{uri: this.props.headerImage}}
                        resizeMode="cover"
                    />
                </View>

                <View style={style.cardHeaderTopTextContainer}>
                    <SocMedIcon type={this.props.socialMedia} />
                </View>

                <View style={style.cardHeaderBottomTextContainer}>
                    <Text style={style.cardHeaderBottomText}>
                        {this.props.title}
                    </Text>
                </View>
                
                <View style={style.cardBodyContainer}>
                    {this.props.content}
                </View>
            </View>
        );
    }
}

export { CardHome };
