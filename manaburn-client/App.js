import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {getCachedAuthAsync, signInAsync, signOutAsync} from './helpers/AppAuthHelpers'
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeTabNavigator from './navigation/BottomTabNavigator';
import AuthContext from './context/AuthContext'
import FeedbackModalStack from './navigation/ModalNavigator';
import SignInScreen from './screens/SignInScreen';
const Stack = createStackNavigator();

export default function App(props) {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      // May not be necessary
      case 'SIGN_IN_ANON':
        return {
          ...prevState,
          isSignout: false,
          authState: action.authState,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          authState: action.authState,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          authState: null,
        };
      default:
        return prevState;
    }
  },
  {
    isLoading: true,
    isSignout: false,
    authState: null,
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try{
          const authState = await signInAsync();
          dispatch({ type: 'SIGN_IN', authState });
        } catch(e) {
          throw e;
        }
      },
      signOut: async () => {
        try{
          const cachedAuth = await getCachedAuthAsync();
          await signOutAsync(cachedAuth);
          dispatch({ type: 'SIGN_OUT' });
        } catch(e) {
          throw e;
        }
      }
    }),
    []
  );
  const isLoadingComplete = useCachedResources(state, dispatch);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' 
        && <StatusBar barStyle="dark-content" />}
        <AuthContext.Provider value={authContext}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator headerMode='none' initialRouteName='Home'>
              {!!state.authState ? (
                <>
                  <Stack.Screen name="Home" component={HomeTabNavigator} />
                  <Stack.Screen name='FeedbackStack' component={FeedbackModalStack} />
                </>
              ) : (
                <Stack.Screen name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
