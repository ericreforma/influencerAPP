import React, { Component } from 'react';
import {
	createStackNavigator, 
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';

import LoadingPage from '../pages/LoadingPage';
import LandingPage from '../pages/LandingPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import CampaignPage from '../pages/CampaignPage';
import ProfilePage from '../pages/ProfilePage';
import MyCampaignPage from '../pages/MyCampaignPage';
import DashboardPage from '../pages/DashboardPage';

export default class Route extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}

const AuthStack = createStackNavigator(
	{
		Login: LogInPage,
		Signup: SignUpPage
	},{
		initialRouteName: 'Login',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);

const AppStack = createStackNavigator(
	{
		Landing: LandingPage,
		Welcome: WelcomePage,
		Home: HomePage,
		Notification: NotificationPage,
		Campaign: CampaignPage,
		Profile: ProfilePage,
		Mycampaign: MyCampaignPage,
		Dashboard: DashboardPage,
	},{
		initialRouteName: 'Landing',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}	
);

const RouteStack = createSwitchNavigator(
	{
		Loading: LoadingPage,
		App: AppStack,
		Auth: AuthStack
	},{
		initialRouteName: 'Loading'
	}
);

const AppContainer = createAppContainer(RouteStack);
