import EncryptedStorage from 'react-native-encrypted-storage';

const USER_TOKEN_KEY = 'crypto_user_token';

const set = async (token: string) => {
  await EncryptedStorage.setItem(USER_TOKEN_KEY, token);
};

const get = async () => {
  return await EncryptedStorage.getItem(USER_TOKEN_KEY);
};

const remove = async () => {
  await EncryptedStorage.removeItem(USER_TOKEN_KEY);
};

export default {
  set,
  get,
  remove,
};
