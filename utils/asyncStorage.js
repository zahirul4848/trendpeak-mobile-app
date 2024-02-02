import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async(key)=> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value!== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
}

export const setItem = async(key, value)=> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err.error);
  }
}

export const removeItem = async(key)=> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err.error);
  }
}


// clearAllData() {
//   AsyncStorage.getAllKeys()
//       .then(keys => AsyncStorage.multiRemove(keys))
//       .then(() => alert('success'));
// }

export const getUserData = async () => {
  const data = getItem("trendPeakUserInfo");
  if(data?.name && data?.email) {
    getItem("trendPeakUserInfo").then(JSON.parse).then(value => {
      return value ? value : null;
    });
  } else {
    return null;
  }
}