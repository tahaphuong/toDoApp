import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {AppStack} from '../nav/AppStack';
import {AuthStack} from '../nav/AuthStack';
import AuthLoading from '../auth/AuthLoading';


const Switcher = createSwitchNavigator({
  AppStack: AppStack,
  AuthStack: AuthStack,
  AuthLoading: AuthLoading
},
{
  initialRouteName:'AuthStack'
});

export default createAppContainer(Switcher);