import React from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import Logo from './Logo';
import UserInfo from './UserInfo';
import headerStyle from '../../styles/header.style';
import Title from './Title';
import { BackButton } from '../Button';

const navOptions = ({ navigation }) => ({
    headerLeft: <Logo navigation={navigation} theme={'light'} />,
    headerRight: <MenuButton navigation={navigation} theme={'light'} />,
    headerStyle: headerStyle.light
});

const navOptionsDark = ({ navigation }) => ({
    headerLeft: <Logo navigation={navigation} theme={'dark'} />,
    headerRight: <MenuButton navigation={navigation} theme={'dark'} />,
    headerStyle: headerStyle.dark
});

const innerPageHeader = title => ({
    title,
    headerLeft: <BackButton darkButton={true} />,
    headerRight: null,
    headerStyle: headerStyle.innerPage
});

export {
    Menu,
    UserInfo,
    navOptions,
    navOptionsDark,
    Title,
    innerPageHeader
};
