import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {ReducerStatus} from '../enums/ReducerStatus';
import {loginUserAsync} from '../redux/user/asyncActions/loginUserAsync';
import {resetUserStatus} from '../redux/user/userSlice';
import {selectUserMessage, selectUserStatus} from '../redux/user/userSelectors';
import {NavigationRoute} from '../enums/NavigationRoute';
import {LoginScreenNavigationProp} from '../navigation/AuthenticationStackNavigator';
import AuthenticationForm, {
  AuthenticationFormValues,
} from '../components/forms/AuthenticationForm';
import SafeView from '../components/SafeView';
import DismissibleKeyboardView from '../components/DismissibleKeyboardView';
import AppSnackbar from '../components/AppSnackbar';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const userStatus = useAppSelector(selectUserStatus);
  const userMessage = useAppSelector(selectUserMessage);

  const handleLoginUser = useCallback(
    (values: AuthenticationFormValues) => {
      dispatch(loginUserAsync(values));
    },
    [dispatch],
  );

  const handleResetUserStatus = useCallback(() => {
    dispatch(resetUserStatus());
  }, [dispatch]);

  const handleNavigateToRegisterScreen = useCallback(() => {
    navigation.navigate(NavigationRoute.registerScreen);
  }, [navigation]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <DismissibleKeyboardView>
        <AuthenticationForm
          isLoading={userStatus === ReducerStatus.loading}
          onSubmit={handleLoginUser}
        />

        <TouchableOpacity
          style={styles.registerPromptContainer}
          onPress={handleNavigateToRegisterScreen}>
          <Text>Need to register? Press here!</Text>
        </TouchableOpacity>

        <AppSnackbar
          message={userMessage}
          isVisible={userStatus === ReducerStatus.error}
          onDismiss={handleResetUserStatus}
        />
      </DismissibleKeyboardView>
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  registerPromptContainer: {
    marginTop: 20,
  },
});
