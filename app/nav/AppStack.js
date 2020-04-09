import React, { Component } from 'react'
import { CreateAppContainer, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../home/Home';

import Task from '../task/Task';
import TaskDetail from '../task/TaskDetail';


import BottomNav from '../components/BottomNav'


// import { Icon } from 'react-native-elements'

// const mainRed = '#E26B5A';

// const HomeStack = createStackNavigator(
//   {
//     home: {screen: Home},
//   },
//   {
//     defaultNavigationOptions: {headerShown: false},
    
//   }
// );

const TaskStack = createStackNavigator(
  {
    home: {screen: Task},
    TaskDetail: {screen: TaskDetail}
  },
  {
    defaultNavigationOptions: {headerShown: false}
  }
);

export const AppStack = createBottomTabNavigator(
  {
    Home: Home,
    Task: TaskStack,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomNav,
  }
);
