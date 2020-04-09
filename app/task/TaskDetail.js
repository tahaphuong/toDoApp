import React, { Component } from "react"
import  {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  PanResponder,
  Animated

} from "react-native"

import { sHome, sTask } from '../MainStyle';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import firebase from 'react-native-firebase';


// import GLOBAL from '../GLOBAL';


// VERTICAL DEVICE ONLY
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorByTasks = {
  personal: "#f9c229",
  work: "#03c03c",
  meeting: "#d10263"
}

const bellColor = {
  on: '#ffdc00',
  off: '#dedede'
}

const taskColor = {
  yellow: '#ffd506',
  red: '#d10263',
  green: '#1ed102'
}

const tick = <Icon name='ios-checkmark-circle' type='ionicon' color='#83c752' size={WIDTH*0.07}/>
const untick = <Icon name='ios-radio-button-off' type='ionicon' color='#dedede' size={WIDTH*0.07}/>

class TaskDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskTextStyle: sHome.taskContentTextNormal,
    };

    
  }


  // 2 functions below are pretty similar. Should combine as one.

  changeTick = async (createdAt, cate) => {
    let tasks = this.props.data.userTasks;

    for (let ele of tasks[cate]) {
      if(ele.createdAt == createdAt) {
        ele.tick = !ele.tick;
      }
    }
    await this.props.handle({type: 'updateTasks', payload: {tasks: tasks}})    

    await firebase
    .firestore()
    .collection('users')
    .doc(this.props.data.userData.uid)
    .update({
      [cate]: tasks[cate]
    })

  }

  changeNoti = async (createdAt, cate) => {
    let tasks = this.props.data.userTasks;

    for (let ele of tasks[cate]) {
      if(ele.createdAt == createdAt) {
        ele.noti = !ele.noti;
      }
    }
    await this.props.handle({type: 'updateTasks', payload: {tasks: tasks}})    

    await firebase
    .firestore()
    .collection('users')
    .doc(this.props.data.userData.uid)
    .update({
      [cate]: tasks[cate]
    })

  }
  
  render() {
    
    let cateTitle = this.props.navigation.state.params.cate
    let cate = cateTitle.toLowerCase()
    let list = this.props.data.userTasks;
    let tasksCate = []

    // NOW: show all, unordered list
    // FIX: show in date order

      // go through each ele of array
    if (list[cate]) {
      for (let task of list[cate]) {
        tasksCate.push(
        <View style={[sHome.taskLine, {backgroundColor: colorByTasks[cate]}]} key={tasksCate.length}>
          <View style={sHome.task}>
            <TouchableOpacity onPress={()=>this.changeTick(task.createdAt, cate)}>{task.tick ? tick : untick}</TouchableOpacity>
            <View style={sHome.taskTimeCon}><Text style={sHome.taskTimeText}>{task.time}</Text></View>
            <View style={sHome.taskContentCon}><Text style={sHome.taskContentTextNormal}>{task.content}</Text></View>
            <TouchableOpacity onPress={()=>this.changeNoti(task.createdAt, cate)}><Icon name='ios-notifications' type='ionicon' color={task.noti ? bellColor.on : bellColor.off} size={WIDTH*0.06}/></TouchableOpacity>
          </View>
        </View>
        )
      }
    }

    return(
      <>
      <ScrollView>
      <View style={sHome.header}>
        <View><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={sHome.backButtonCon}><Text style={sHome.backButtonText}>Back</Text></TouchableOpacity></View>
        <View style={sHome.profileHeader}>
          <View>
            <Text style={sHome.hello}>Hello {this.props.data.userData.displayName}</Text>
            <Text style={sHome.helloTasks}>You have total {tasksCate.length} tasks.</Text>
          </View>
          <View style={sHome.avaFrame}><Image/></View>
        </View>
        
      </View>

      <View style={sHome.body}>

        <View style={sHome.section}>
          <View><Text style={sHome.title}>{cateTitle}</Text></View>

          <View style={sHome.taskList}>
            
            {tasksCate}
          </View>

        </View>


      </View>
      </ScrollView>
      </>
    );
  }
}


// output
const mapStateToProps = state => {
  return {
    data: state.handleUser
  }
}

// call function
const mapDispatchToProps = dispatch => {
  return {
    handle: action => dispatch(action),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
