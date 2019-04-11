import React, { Component } from 'react';
import { ImageBackground, Text, View, Image, TouchableHighlight } from 'react-native';
import ButtonWhite from '../components/ButtonWhite';
import ButtonGradient from '../components/ButtonGradient';
import SocMedIcon from '../components/SocMedIcon';
import styles from '../styles/page.Intro.style';

export default class LandingPage extends Component {
  socMedClick = (type) => {
    alert(type);
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/image/landing_page_bg.jpg')}
        style={styles.introContainer}
      >
        <View>

          <Text
            style={[styles.introTextCommon, styles.landingPageHeader]}
          >
            WHERE { '\n' }
            CREATORS ARE { '\n' }
            COLLABORATORS
          </Text>

          <Text
            style={[styles.introTextCommon, styles.landingPageText]}
          >
            Be part of the platform that connects brands to influencers
            in a fast convinient way.
          </Text>

          <View>
            <ButtonWhite text="Log In" />

            <ButtonGradient text="Sign Up" />
          </View>

          <Text
            style={[styles.introAdditionalText, styles.landingPageLoginWith]}
          >
            Or log in with
          </Text>

          <View style={styles.introViewSocMed}>
            <TouchableHighlight
              onPress={() => this.socMedClick('facebook')}
            >
              <SocMedIcon type="facebook" />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.socMedClick('google')}
            >
              <SocMedIcon type="google" />
            </TouchableHighlight>
          </View>

        </View>
      </ImageBackground>
    );
  }
}
