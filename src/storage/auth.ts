 import AsyncStorage from '@react-native-async-storage/async-storage'
 
export const storeData = async (key: string, data: any) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(data)
        );
    } catch (error) {
    }
};

export const retrieveData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};

export const removeData=async(key:string)=>{
    try {
        const value = await AsyncStorage.removeItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
}
