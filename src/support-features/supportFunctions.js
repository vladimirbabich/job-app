import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  });

  if (!result.cancelled) {
    console.log('%c' + result, 'color:red');
    console.log(result);
    const photo = { uri: result.uri, w: result.width, h: result.height, b64: result.base64 };
    return photo;

  }
  return result;
};

export async function getStorageValue(key) {
  var value = await AsyncStorage.getItem(key)
  return value
}
