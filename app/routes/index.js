import React, { Component } from 'react';
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
	createDrawerNavigator
} from 'react-navigation';
import NavigationService from '../services/navigation';
import { Menu, navOptions } from '../components/Header';
import lang from '../assets/language/Main';

import {
	LoadingPage,
	LandingPage,
	LoginPage,
	SignUpPage,
	WelcomePage,
	HomePage,
	NotificationPage,
	MyCampaignPage,
	CampaignPage,
	EventPage,
	ProfilePage,
	CreatePostPage,
	CreateApplicationPage,
	EditProfilePage,
	PostPage,
	EarningsPage,
	EditCategoryPage,
	DashboardPage,
	UpdatePostPage,
	MyPostPage,
	ChatPage,
	ChatListPage,
	ReportProblemPage,
	EditPostPage,
	VerificationCodePage,
	CampaignViewAllPage,
	CreateApplicationJobPage,
	WithdrawPage,
	PreviewPostPage,
	MyEventPage,
} from '../pages';
	
const menuItems = [
	{
		label: lang.navigation.viewProfileText,
		page: 'Profile'
	}, {
		label: lang.navigation.earningsText,
		page: 'Earnings'
	}, 
	{
		label: lang.navigation.myCampaignsText,
		page: 'MyCampaign'
	}, 
	{
		label: 'Message',
		page: 'ChatList'
	},
	{
		label: lang.navigation.aboutText,
		page: 'about'
	}
	
];

const drawerOptions = {
	defaultNavigationOptions: navOptions,
	contentComponent: ({ navigation }) => (
		<Menu navigation={navigation} menuItems={menuItems} />
	),
	drawerPosition: 'right',
	drawerBackgroundColor: 'rgba(255,255,255, 0)',
};

const AuthStack = createStackNavigator({
	Landing: LandingPage,
	Login: LoginPage,
	Signup: SignUpPage,
	Welcome: WelcomePage,
	VerificationCode: VerificationCodePage
}, {
	initialRouteName: 'Landing',
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false
	}
});

const HomeStack = createStackNavigator({
	Home: HomePage,
	Campaign: CampaignPage,
	CampaignViewAll: CampaignViewAllPage,
	Event: EventPage,
	CreatePost: CreatePostPage,
	CreateApplication: CreateApplicationPage,
	Post: PostPage,
}, drawerOptions);

const CampaignStack = createStackNavigator({
	MyCampaign: MyCampaignPage,
	MyEvent: MyEventPage,
	Campaign: CampaignPage,
	Event: EventPage,
	CreateApplication: CreateApplicationPage,
	CreateApplicationJob: CreateApplicationJobPage,
	Post: PostPage,
	EditPost: EditPostPage,
	MyPost: MyPostPage,
	Dashboard: DashboardPage,
	CreatePost: CreatePostPage,
	UpdatePost: UpdatePostPage,
	Chat: ChatPage,
	PreviewPost: PreviewPostPage
}, drawerOptions);

const ProfileStack = createStackNavigator({
	Profile: ProfilePage,
	EditProfile: EditProfilePage,
	EditCategory: EditCategoryPage
}, drawerOptions);

const NotificationStack = createStackNavigator({
	Notification: NotificationPage,
}, drawerOptions);

const EarningsStack = createStackNavigator({
	Earnings: EarningsPage,
	Withdraw: WithdrawPage
}, drawerOptions);

const ChatStack = createStackNavigator({
	ChatList: ChatListPage,
	Chat: ChatPage,
}, drawerOptions);

const ReportStack = createStackNavigator({
	ReportProblem: ReportProblemPage,
}, drawerOptions);

const AppDrawer = createDrawerNavigator({
	HomeStack,
	CampaignStack,
	NotificationStack,
	ProfileStack,
	EarningsStack,
	ChatStack,
	ReportStack
}, drawerOptions);

const RouteStack = createSwitchNavigator({
	Loading: LoadingPage,
	App: AppDrawer,
	Auth: AuthStack
}, {
	initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(RouteStack);

export default class Route extends Component {
	render() {
		return (
			<AppContainer
				ref={(navigatorRef) => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}
