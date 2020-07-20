import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { GradientButton, WhiteButton } from '../../components/Button';
import {
    LabelText,
    CommonText
} from '../../components/Text';

import theme from '../../styles/theme.style';
import lang from '../../assets/language/mycampaign';

class MyCampaignActiveCard extends Component {
    deadlineDate = (dates, timeInclude, header) => {
        var d = dates.split(' ')[0],
            time = dates.split(' ')[1],
            year = d.split('-')[0],
            month = parseInt(d.split('-')[1]),
            date = d.split('-')[2],
            hour = parseInt(time.split(':')[0]),
            min = time.split(':')[1],
            months = [
                'JAN', 'FEB', 'MAR', 'APR',
                'MAY', 'JUN', 'JUL', 'AUG',
                'SEP', 'OCT', 'NOV', 'DEC'
            ],
            time = hour == 0 ? '12:' + min + ' AM' : (
                hour < 13 ? (hour.length < 10 ? '0' + hour.toString() : hour) + ':' + min + ' AM' : (
                    ((hour - 12) < 10 ? '0' + (hour - 12).toString() : (hour - 12)) + ':' + min + ' PM'
                )
            );

        if(timeInclude) {
            return time + ' - ' + months[month] + '. ' + date + ', ' + year;
        } else {
            return header ? (
                months[month] + '.' + date + '.' + year
            ) : (
                months[month] + '. ' + date + ', ' + year
            );
        }
    }

    render() {
        var item = this.props.item;

        return (
            <View
                style={{
                    marginVertical: 10,
                    borderRadius: theme.BORDER_RADIUS,
                    backgroundColor: theme.COLOR_WHITE,
                    elevation: 3
                }}
            >
                {/* header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: theme.HORIZONTAL_PADDING,
                        paddingBottom: 0
                    }}
                >
                    {/* sma, client, date */}
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{
                                height: 34,
                                width: 34,
                                marginRight: 10,
                                backgroundColor: theme.COLOR_WHITE + '00'
                            }}
                            resizeMode="contain"
                            source={require('../../assets/image/app_icon.png')}
                        />

                        <View
                            style={{
                                position: 'absolute',
                                left: 7,
                            }}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                resizeMode="contain"
                                source={theme.smaIcons[item.sma]}
                            />
                        </View>

                        <View>
                            <CommonText
                                size="large"
                                text={item.name.length <= 16 ? item.name : item.name.substr(0, 16) + '...'}
                            />

                            <CommonText
                                size="xsmall"
                                text={this.deadlineDate(item.date, false, true)}
                            />
                        </View>
                    </View>

                    {/* message icon */}
                    <View
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => alert('Mesage on press')}
                        >
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                                resizeMode="contain"
                                source={theme.mailIconGray}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                position: 'absolute',
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                backgroundColor: theme.COLOR_YELLOW_HEAVY,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 0,
                                right: 0,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.COLOR_WHITE,
                                    fontSize: 12,
                                    fontFamily: 'AvenirLTStd-Black'
                                }}
                            >
                                {item.message}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* status */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 35
                    }}
                >
                    <View
                        style={{
                            marginRight: 7
                        }}
                    >
                        <CommonText
                            size="medium"
                            text={"Status"}
                        />
                    </View>

                    <CommonText
                        size="medium"
                        red={item.status !== 1 ? true : false}
                        blue={item.status === 1 ? true : false}
                        text={lang.statusText[item.status]}
                    />
                </View>

                {/* deadline */}
                <View
                    style={{
                        backgroundColor: theme.COLOR_PAGE_HIGHLIGHT,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                >
                    <CommonText
                        size="small"
                        text={"Deadline"}
                    />

                    <LabelText
                        size="large"
                        blue={true}
                        text={this.deadlineDate(item.date, true)}
                    />
                </View>

                {/* view dashboard */}
                <View
                    style={{
                        paddingVertical: 30,
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    <GradientButton
                        text={"View Dashboard"}
                    />
                </View>
            </View>
        );
    }
}

class MyCampaignCompletedCard extends Component {
    deadlineDate = (dates, timeInclude, header) => {
        var d = dates.split(' ')[0],
            time = dates.split(' ')[1],
            year = d.split('-')[0],
            month = parseInt(d.split('-')[1]),
            date = d.split('-')[2],
            hour = parseInt(time.split(':')[0]),
            min = time.split(':')[1],
            months = [
                'JAN', 'FEB', 'MAR', 'APR',
                'MAY', 'JUN', 'JUL', 'AUG',
                'SEP', 'OCT', 'NOV', 'DEC'
            ],
            time = hour == 0 ? '12:' + min + ' AM' : (
                hour < 13 ? (hour.length < 10 ? '0' + hour.toString() : hour) + ':' + min + ' AM' : (
                    ((hour - 12) < 10 ? '0' + (hour - 12).toString() : (hour - 12)) + ':' + min + ' PM'
                )
            );

        if(timeInclude) {
            return time + ' - ' + months[month] + '. ' + date + ', ' + year;
        } else {
            return header ? (
                months[month] + '.' + date + '.' + year
            ) : (
                months[month] + '. ' + date + ', ' + year
            );
        }
    }

    render() {
        var item = this.props.item;

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[theme.COLOR_BLUE, theme.COLOR_BLUE_LIGHT_GRADIENT]}
                style={{
                    marginVertical: 10,
                    borderRadius: theme.BORDER_RADIUS,
                    backgroundColor: theme.COLOR_WHITE,
                    elevation: 3
                }}
            >
                {/* header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: theme.HORIZONTAL_PADDING,
                    }}
                >
                    {/* sma, client, date */}
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{
                                height: 34,
                                width: 34,
                                marginRight: 10,
                                backgroundColor: theme.COLOR_WHITE + '00'
                            }}
                            resizeMode="contain"
                            source={require('../../assets/image/app_icon.png')}
                        />

                        <View
                            style={{
                                position: 'absolute',
                                left: 7,
                            }}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                resizeMode="contain"
                                source={theme.smaIcons[item.sma]}
                            />
                        </View>

                        <View>
                            <CommonText
                                size="large"
                                white={true}
                                text={item.name.length <= 16 ? item.name : item.name.substr(0, 16) + '...'}
                            />

                            <CommonText
                                size="xsmall"
                                white={true}
                                text={this.deadlineDate(item.date, false, true)}
                            />
                        </View>
                    </View>

                    {/* message icon */}
                    <View
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => alert('Mesage on press')}
                        >
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                                resizeMode="contain"
                                source={theme.mailIconWhite}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                position: 'absolute',
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                backgroundColor: theme.COLOR_YELLOW_HEAVY,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 0,
                                right: 0,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.COLOR_WHITE,
                                    fontSize: 12,
                                    fontFamily: 'AvenirLTStd-Black'
                                }}
                            >
                                {item.message}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* completed */}
                <View
                    style={{
                        backgroundColor: theme.COLOR_WHITE,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 15,
                        marginLeft: 7,
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <CommonText
                            size="small"
                            text={"Completed"}
                        />

                        <LabelText
                            size="large"
                            blue={true}
                            text={this.deadlineDate(item.date, false)}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={this.props.favoriteButtonOnPress(item.id)}
                    >
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                            }}
                            resizeMode="contain"
                            source={item.favorite == 1 ? theme.favoriteActiveIcon : theme.favoriteInactiveIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* view dashboard */}
                <View
                    style={{
                        paddingVertical: 15,
                        paddingHorizontal: theme.HORIZONTAL_PADDING
                    }}
                >
                    <WhiteButton
                        text={"View Dashboard"}
                    />
                </View>
            </LinearGradient>
        );
    }
}

export {
    MyCampaignActiveCard,
    MyCampaignCompletedCard
};
