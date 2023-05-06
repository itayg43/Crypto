import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {ReducerStatus} from '../enums/ReducerStatus';
import {registerUserAsync} from '../redux/user/asyncActions/registerUserAsync';
import {resetUserStatus} from '../redux/user/userSlice';
import {selectUserMessage, selectUserStatus} from '../redux/user/userSelectors';
import AuthenticationForm, {
  AuthenticationFormValues,
} from '../components/forms/AuthenticationForm';
import SafeView from '../components/SafeView';
import DismissibleKeyboardView from '../components/DismissibleKeyboardView';
import AppSnackbar from '../components/AppSnackbar';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector(selectUserStatus);
  const userMessage = useAppSelector(selectUserMessage);

  const handleRegisterUser = useCallback(
    (values: AuthenticationFormValues) => {
      dispatch(registerUserAsync(values));
    },
    [dispatch],
  );

  const handleResetUserStatus = useCallback(() => {
    dispatch(resetUserStatus());
  }, [dispatch]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <DismissibleKeyboardView>
        <AuthenticationForm
          isLoading={userStatus === ReducerStatus.loading}
          onSubmit={handleRegisterUser}
        />

        <AppSnackbar
          message={userMessage}
          isVisible={userStatus === ReducerStatus.error}
          onDismiss={handleResetUserStatus}
        />
      </DismissibleKeyboardView>
    </SafeView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
