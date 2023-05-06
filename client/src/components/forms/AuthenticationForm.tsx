import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import dismissKeyboard from '../../utils/dismissKeyboard';

export interface AuthenticationFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

interface Props {
  isLoading: boolean;
  onSubmit: (values: AuthenticationFormValues) => void;
}

const AuthenticationForm = ({isLoading, onSubmit}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthenticationFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleToggleHidePassword = useCallback(() => {
    setHidePassword(currentState => !currentState);
  }, [setHidePassword]);

  const handleSubmitForm = useCallback(
    (values: AuthenticationFormValues) => {
      dismissKeyboard();
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <>
      {/** email */}
      <Controller
        name="email"
        control={control}
        render={({field: {value, onChange}}) => (
          <>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email?.message && (
              <HelperText type="error">{errors.email?.message}</HelperText>
            )}
          </>
        )}
      />

      {/** password */}
      <Controller
        name="password"
        control={control}
        render={({field: {value, onChange}}) => (
          <>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              right={
                <TextInput.Icon icon="eye" onPress={handleToggleHidePassword} />
              }
            />
            {errors.password?.message && (
              <HelperText type="error">{errors.password?.message}</HelperText>
            )}
          </>
        )}
      />

      {/** submit */}
      <Button
        style={styles.submitButton}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit(handleSubmitForm)}>
        Submit
      </Button>
    </>
  );
};

export default AuthenticationForm;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
  },

  submitButton: {
    marginTop: 10,
    borderRadius: 4,
  },
});
