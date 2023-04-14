import React, {useEffect} from 'react';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {useAppSelector} from './src/hooks/useAppSelector';
import {selectInitializeStatus} from './src/redux/initialize/initializeSelectors';
import {initializeDataAsync} from './src/redux/initialize/asyncActions/initializeDataAsync';
import {ReducerStatus} from './src/enums/ReducerStatus';
import LoadingScreen from './src/screens/LoadingScreen';
import AppBottomTabNavigator from './src/navigation/AppBottomTabNavigator';

const App = () => {
  const dispatch = useAppDispatch();

  const initializeStatus = useAppSelector(selectInitializeStatus);

  useEffect(() => {
    dispatch(initializeDataAsync());
  }, [dispatch]);

  return (
    <>
      {initializeStatus === ReducerStatus.loading && <LoadingScreen />}
      {initializeStatus === ReducerStatus.finish && <AppBottomTabNavigator />}
    </>
  );
};

export default App;
