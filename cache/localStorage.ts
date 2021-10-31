import * as SecureStore from "expo-secure-store";

interface INamesStatus {
  name: string;
  status: string;
}

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return JSON.parse(result);
  } else {
    return undefined;
  }
}

export { save, getValueFor };
