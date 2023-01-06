import { Alert } from "react-native";

export function getNumberFromPercent(size, percent) {
  return size / 100 * percent;
}
export const checkValueOfString = (str, statement, errorMsg) => {
  //if statement==true - return false
  // console.log('12')
  // console.log(str)
  // console.log(statement)
  if (statement) {
    Alert.alert('Ошибка', errorMsg);
    console.log(errorMsg);
    return false;
  }
  return true;
}