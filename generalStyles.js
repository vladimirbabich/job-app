//size variables:
const elementWidth = '95%';
const elementHeight = '6vh';
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
  screenScroll: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '1%',
    paddingTop: '5%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
    padding: '2%',
    fontSize: 20,
    width: elementWidth,
    fontWeight: 'bold',
  },
  textInput: {
    width: elementWidth,
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
      width: elementWidth,
      borderWidth: 1,
      minHeight: elementHeight,
      borderColor: colors.actionColor,
      textAlign: 'center',
      // alignItems: 'center'
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
      // alignItems: 'center'
    }
  },
  btnTxtSmall: {
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    margin: 'auto',
  },
}
export default generalStyles;