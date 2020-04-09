import { createStackNavigator } from 'react-navigation-stack';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';

export const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
  }, 
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {headerShown: false}
  },
);