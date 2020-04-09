/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Con from "./app/nav/AppCon";
import DemoRedux from './app/redux/DemoRedux'

import { Provider } from 'react-redux';

import CreateStore from './app/redux/CreateStore';
const store = CreateStore

const App: () => React$Node = () => {
  return (
    <>
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent"/>

      <Con/>



      <SafeAreaView>
      </SafeAreaView>
    </Provider>
    

    </>
  );
};


export default App;
