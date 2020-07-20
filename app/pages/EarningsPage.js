import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { navOptionsDark } from '../components/Header';
import { LabelText, CommonText } from '../components/Text';
import { GradientButton } from '../components/Button';
import GradientContainer from '../components/GradientContainer';
import { Utils } from '../controllers';
import theme from '../styles/theme.style';
import style from '../styles/page.EarningsPage.style';
import { URL } from '../config/url';
import image from '../assets';
import { SOCIALMEDIA } from '../config/variables';

class EarningsPage extends Component {
    static navigationOptions = navOptionsDark;

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user !== prevState.user) {
          return { 
              user: nextProps.user,
              profilePhoto: nextProps.user.media === null ?
                image.male_avatar : 
                { uri: `${URL.SERVER_STORAGE}/${nextProps.user.media.url}` }
            };
        }
        
        return null;
     }

    constructor(props) {
        super(props);

        this.state = {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            user: this.props.user,

            earning: [{
                brand: 'Fujifilm',
                date: '10.20.19',
                amount: '16K'
            },
            {
                brand: 'Peugeot',
                date: '7.6.19',
                amount: '5K'
            },
            {
                brand: 'Unicef',
                date: '3.11.19',
                amount: '23K'
            }],
            profilePhoto: this.props.user.media === null ?
                image.male_avatar : 
                { uri: `${URL.SERVER_STORAGE}/${this.props.user.media.url}` },
        };
    }

    profilePicture = () =>
        <View
            style={{
                height: ((this.state.width / 3) / 2) + 6,
                maxHeight: (300 / 2) + 6,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    top: 0,
                    padding: 5,
                    borderRadius: 150,
                    borderWidth: 2,
                    borderColor: theme.COLOR_BLUE_GREEN
                }}
            >
                <Image
                    style={{
                        width: this.state.width / 3,
                        maxWidth: 300,
                        height: this.state.width / 3,
                        maxHeight: 300,
                        borderRadius: this.state.width / 3
                    }}
                    resizeMode="cover"
                    source={this.state.profilePhoto}
                />
            </View>
        </View>

    profileName = () => 
        <View style={style.div}>
            <LabelText
                size="large"
                dark={true}
                text={this.state.user.name}
            />
        </View>

    description = () => 
        <View style={style.div}>
            <CommonText
                size="small"
                textAlignCenter={true}
                text={this.state.user.description}
            />
        </View>

    totalEarn = () =>
        <View style={style.totalEarnContainer}>
            <Text style={style.totalEarn}>17K</Text>
            <TouchableOpacity onPress={() => { }} >
                <Text
                    style={{
                        fontSize: theme.FONT_SIZE_SMALL,
                        color: theme.COLOR_YELLOW_HEAVY,
                    }}
                >
                Edit Bank Details
                </Text>
            </TouchableOpacity>
        </View>

    earnList = () =>
        <View style={{ marginTop: 20 }}>
            {this.state.earning.map((earn, index) => 
                <View style={style.earnListContainer} key={index}>
                    <Text style={style.earnBrand}>{earn.brand}</Text>
                    <Text style={style.earnDate}>{earn.date}</Text>
                    <GradientContainer style={style.earnAmount}>
                        <Text style={style.earnAmountText}>
                            {`${this.state.user.country.monetary_sign.toUpperCase()}${earn.amount}`}
                        </Text>
                    </GradientContainer>
                </View>
            )}
        </View>
        
    earningHistory = () =>
        <View style={style.earningHistoryHeader}>
            <Text style={style.earningHistory}>Earning History</Text>
            <Text style={style.earningHistorySort}>Weekly</Text>
        </View>

    render = () => 
        <View 
            style={{ 
                flex: 1, 
                backgroundColor: theme.COLOR_BLACK, 
                paddingHorizontal: theme.HORIZONTAL_PADDING
            }}
        >
            <ScrollView>
                {/* PROFILE INFO */}
                <View style={style.div}>
                    { this.profilePicture() }
                    
                    <View
                        style={{
                            backgroundColor: theme.COLOR_WHITE,
                            borderRadius: theme.BORDER_RADIUS,
                            width: '100%'
                        }}
                    >
                        <View
                            style={{
                                height: ((this.state.width / 3) / 2) + 6,
                                maxHeight: (300 / 2) + 6,
                                width: '100%',
                            }}
                        />

                        <View style={{ padding: 20, }} >

                            { this.profileName() }

                            { this.totalEarn() }

                            <GradientButton 
                                text='Withdraw' 
                                style={{ marginTop: 35 }}
                                onPress={() => {
                                    this.props.navigation.navigate('Withdraw')
                                }}
                            />

                            { this.earningHistory() }

                            { this.earnList() }
                        </View>
                    </View>
                </View>
            </ScrollView> 

        </View>
}

const mapStateToProps = state => ({
    user: state.user.profile,
});

export default connect(mapStateToProps)(EarningsPage);
