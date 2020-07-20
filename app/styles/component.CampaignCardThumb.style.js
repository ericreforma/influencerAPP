import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    componentWrapper: {
        borderRadius: theme.BORDER_RADIUS,
        marginHorizontal: 5,
        marginBottom: 5,
        elevation: 2,
        width: 180,
        maxWidth: 180,
        height: 250
    },
    smIconContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 3
    },
    smIconImage: {
        width: 20,
        height: 20,
    },
    mainImageContainer: {
        width: 180,
        maxWidth: 180,
        height: 165,
        maxHeight: 200,
        borderTopLeftRadius: theme.BORDER_RADIUS,
        borderTopRightRadius: theme.BORDER_RADIUS
    },
    mainImage: {
        width: 180,
        maxWidth: 180,
        height: 165,
        maxHeight: 200,
        borderTopLeftRadius: theme.BORDER_RADIUS,
        borderTopRightRadius: theme.BORDER_RADIUS
    },
    nameContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: theme.COLOR_WHITE,
        borderBottomLeftRadius: theme.BORDER_RADIUS,
        borderBottomRightRadius: theme.BORDER_RADIUS,
        justifyContent: 'space-between'
    }
});
