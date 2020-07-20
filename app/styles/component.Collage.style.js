import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    container: {
        height: 200,
        maxHeight: 200,
        overflow: 'hidden',
    },
    mediaFull: {
        alignSelf: 'stretch',
        height: 200,
        maxHeight: 200,
    },
    rowContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    columnHalf: {
        height: 200,
        width: '50%'
    },
    imageHalf: {
        height: 200,
        width: '100%'
    },
    quarter: {
        height: 100,
        alignSelf: 'stretch'
    },
    quarterImage: {
        width: '100%',
        height: 100
    },
    multiContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'stretch',
        height: 200
    },
    multiContainerRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 100
    },
    multiContainerQuarter: {
        height: 100,
        width: '50%',
        position: 'relative'
    },
    multiContainerQuarterImage: {
        height: 100,
        alignSelf: 'stretch'
    },
    multiPlus: {
        height: 100,
        alignSelf: 'stretch',
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    multiPlusText: {
        color: '#fff',
        fontSize: 55
    },
    collageVideoContainer: {
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    collageVideoButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: 50,
        height: 50,
        zIndex: 1,
    },
    bulletContainer:{
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 3,
    },
    navBullet: {
        marginHorizontal: 5,
        color: '#fff',
        opacity: 0.8,
        fontSize: 19

    },
    navBulletCurrent: {
        marginHorizontal: 5,
        color: '#fff',
        opacity: 0.8,
        fontSize: 35

    }
});
