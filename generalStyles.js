import { Dimensions } from 'react-native';
import { getNumberFromPercent } from './src/support-features/supportFunctions';

export const mainWidth = '95%';
//size variables:
const elementWidth = '100%';
const elementHeight = '6vh';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const overlayImageSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50)
};

//colors:
export const colors = {
  backgroundColor: '#FDFFFE',
  mainColor: '#75ebe0',
  cartColor: '#f4ffff',
  actionColor: '#2f9f94',
  errorColor: 'red',
  descriptionColor: '#8d99ae',
};
const generalStyles = {
  centerBlock: ({ width, height, offsetY }) => {
    return {
      alignItems: 'flex-end',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'fixed',
      top: offsetY+windowHeight-(windowHeight*0.25)-height,
      left: (windowWidth - width) / 2,
      justifyContent: 'center',
      flexDirection: 'column',
    }
  },
  overlayImage: {
    margin: 'auto',
    height: overlayImageSize.h,
    width: overlayImageSize.w,
    zIndex: 2,
  },
  screenScroll: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: '5%',
    width: '100%',
    height:'100%'
  },
  title: {
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
    padding: '2%',
    marginHorizontal: 'auto',
    fontSize: 20,
    width: mainWidth,
    fontWeight: 'bold',
  },
  textInput: {
    width: mainWidth,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.actionColor,
    marginTop: '1%',
    marginBottom: '1%',
    minHeight: elementHeight,
  },
  btn: ({ pressed }) => {
    return {
      backgroundColor: pressed
        ? colors.actionColor
        : colors.mainColor,
      marginTop: '2%',
      width: mainWidth,
      borderWidth: 1,
      marginHorizontal: 'auto',
      minHeight: elementHeight,
      borderColor: colors.actionColor,
      textAlign: 'center',
    }
  },
  btnTxt: {
    fontFamily: 'Roboto-Black',
    fontSize: 22,
    margin: 'auto',
  },
  btnSmall: ({ pressed }) => {
    return {
      backgroundColor: pressed
        ? colors.actionColor
        : colors.mainColor,
      marginTop: '1%',
      width: '100%',
      borderWidth: 1,
      minHeight: '3vh',
      borderColor: colors.actionColor,
      textAlign: 'center',
    }
  },
  btnTxtSmall: {
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    margin: 'auto',
  },
}
export default generalStyles;