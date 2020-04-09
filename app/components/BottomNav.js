import React, { Component } from 'react'
import { View, Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  Modal,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { Icon } from 'react-native-elements';
import { sModal, sAuth } from '../MainStyle';
import firebase from 'react-native-firebase';

// import GLOBAL from '../GLOBAL'
import { connect } from "react-redux";

import { withNavigationFocus } from 'react-navigation';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const blue = {
  main: '#5b83e3',
  light: '#81c7f5',
  verylight: '#f9fcff',
}

const grayColor = '#c6c6c8';
const plusButtonSize = WIDTH/4.5;

class BottomNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disableAddTaskButton: false,
      displayTime: {
        hour: 23,
        minute: 59,
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },

      tintColors: {
        tintColorHome: blue.main,
        tintColorTask: "gray",
      },

      modalAddTaskVisible: false,

      categoryChosen: null,
      content: null,
      colorsCate: {
        personal: grayColor,
        work: grayColor,
        meeting: grayColor
      },

      errorAddTask: '',
      
    }
  }

  openTaskModal() {
    this.setDisplayTime();
    this.setState({...this.state, modalAddTaskVisible: true})


  }

  bottomButtonChosen = (navigate) => {
    this.props.navigation.navigate(navigate);

    let pro = 'tintColor' + navigate;
    let allButtons = this.state.tintColors

    for (let val in allButtons) {
      if (val == pro) {
        allButtons[val] = blue.main;
      } else {
        allButtons[val] = 'gray'
      }
    }

    this.setState({...this.state, tintColors: allButtons})
  }

  getCategory = (cate) => {
    let allColors = this.state.colorsCate;
    for (let color in allColors) {
      if (color == cate) {
        allColors[color] = blue.main
      } else {
        allColors[color] = grayColor
      }
    }
    this.setState({...this.state, categoryChosen: cate, colorsCate: allColors});


  }
  getWorkContent = content => {
    if (content.length) {
      this.setState({...this.state, content: content})
    }
  }
  getTimeInput = (text, type) => {
    let dateData = this.state.displayTime;

    switch(type) {
      case 'hour': 
        if(Number(text)<=23 && Number(text)>=0) {
          dateData.hour = Number(text)
        } else {
          dateData.hour = 23
        }
      break;


      case 'minute': 
        if(Number(text)<=59 && Number(text)>0) {
          dateData.minute = Number(text)
        } else {
          dateData.minute = 59
        }
      break;

      case 'date': 

        if([1, 3, 5, 7, 8, 10, 12].includes(dateData.month)) {
          if (Number(text)<=31 && Number(text)>0) {
            dateData.date = Number(text)
          } else {
            dateData.date = 31
          }
        } else if ([4, 6, 9, 11].includes(dateData.month)) {
          if (Number(text)<=30 && Number(text)>0) {
            dateData.date = Number(text)
          } else {
            dateData.date = 30
          }
        } else if (dateData.month == 2) {
          if (Number(text)<=28 && Number(text)>0) {
            dateData.date = Number(text)
          } else if (Number(text)==29 && dateData.year % 4 == 0) {
            dateData.date = 29
          } else {
            dateData.date = 28
          }
        } else {
          dateData.date = 1
        }
      break;


      case 'month': 

      if([1, 3, 5, 7, 8, 10, 12].includes(Number(text))) {
        if (!(dateData.date<=31 && dateData.date>0)) {
          dateData.date = 31
        } 
      } else if ([4, 6, 9, 11].includes(Number(text))) {
        if (!(dateData.date<=30 || dateData.date>0)) {
          dateData.date = 30
        } 
      } else if (Number(text) == 2) {
        if (dateData.date<=28 && dateData.date>0) {
          dateData.date = Number(text)
        } else if (dateData.date==29 && dateData.year % 4 == 0) {
          dateData.date = 29
        } else {
          dateData.date = 28
        }
      } else {
        dateData.month = 1;
      }
      break;


      // check this case again
      case 'year': 
        let thisYear = new Date().getFullYear();
        if (Number(text) >= thisYear && Number(text)<2099) {
          dateData.year = Number(text)
        } else {
          dateData.year = thisYear
        }

      break;
    }
    console.log(dateData)
    this.setState({displayTime: dateData, errorAddTask: ''});

  }

  handleAddTask = async () => {

    this.setState({...this.state, disableAddTaskButton: true})
    
    if (this.state.categoryChosen!=null && this.state.content.length && this.state.displayTime!=null) {

      let cate = this.state.categoryChosen;
      let tasks = this.props.data.userTasks
      let docUser = this.props.data.userData.uid
      let stateDate = this.state.displayTime;
      let time = String(stateDate.year) + "-" + this.setTwoDigitsTime(String(stateDate.month)) + "-" + this.setTwoDigitsTime(String(stateDate.date)) + "T" + this.setTwoDigitsTime(String(stateDate.hour)) + ":" + this.setTwoDigitsTime(String(stateDate.minute)) + ":00.000Z";

      let today = new Date()
      let todayDate = String(today.getFullYear()) + "-" + this.setTwoDigitsTime(String(today.getMonth()+1)) + "-" + this.setTwoDigitsTime(String(today.getDate())) + "T" + this.setTwoDigitsTime(String(today.getHours())) + ":" + this.setTwoDigitsTime(String(today.getMinutes())) + ":00.000Z";
     
      console.log(time, todayDate)

      if (time<todayDate) {
        this.setState({...this.state, errorAddTask: 'Please choose a date forward'})
        return;
      }

      let reminder = {
        content: this.state.content,
        time: time,
        createdAt: new Date().toISOString(),
        noti: false,
        tick: false,
      }

      // push new task
      if (tasks[cate]) {
        tasks[cate].splice(0, 0, reminder)
      } else {
        tasks[cate] = [reminder]
      }
      // add to state
      // GLOBAL.allTasks = all;

      await this.props.handle({type: 'updateTasks', payload: {tasks: tasks}})

      // force update Home Screen 
      // await GLOBAL.homeScreen.forceUpdate();

      this.setState({...this.state, content: null, time: null, modalAddTaskVisible: false})

      // add to firestore
      await firebase
            .firestore()
            .collection('users')
            .doc(docUser)
            .update({
              [cate]: tasks[cate]
            })
      
    }
  
    this.setState({...this.state, disableAddTaskButton: false})

  }

  setDisplayTime() {
    let today = new Date()

    let displayTime;

    if (today.getHours() == 23) {
      today.setDate(today.getDate() + 1);
      displayTime = {
        hour: 0,
        minute: 0,
        date: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      }
    } else {
      displayTime = {
        hour: today.getHours() + 1,
        minute: 0,
        date: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      }
    }

    this.setState({...this.state, displayTime: displayTime})
  }

  setTwoDigitsTime(str) {
    if (str.length <= 1) {
      return '0' + str
    } else {
      return str
    }
  }

  componentDidMount() {
    this.setDisplayTime()
  }

  render() {
    return(
      <>

      <View>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalAddTaskVisible}>    

          <View style={sModal.modalCon}>
            <View style={sModal.modalInside}>
              <TouchableOpacity 
                style={[sNav.plusButtonCon, sModal.crossButtonCon]}
                onPress={()=>{this.setState({...this.state, modalAddTaskVisible: false})}}>
                <Image source={require('../img/plusbutton.png')} style={{height: plusButtonSize, width: plusButtonSize}}/>
              </TouchableOpacity>

              <View style={sModal.addNewTaskTitleCon}><Text style={sModal.addNewTaskTitle}>Add new task</Text></View>
              <View behavior="height" style={sModal.inputModalCon}>
                <TextInput onChangeText={text=>this.getWorkContent(text)} autoFocus={true} maxLength={28} style={sModal.inputModal}></TextInput>
              </View>
              <View style={sModal.lineBorder}></View>
              <View style={sModal.scrollBlockChoose}>
                <ScrollView horizontal={true}>
                  <TouchableOpacity style={sModal.blockChoose} onPress={()=>this.getCategory('personal')}><Text style={[sModal.blockChooseText, {color: this.state.colorsCate.personal}]}>Personal</Text></TouchableOpacity>
                  <TouchableOpacity style={sModal.blockChoose} onPress={()=>this.getCategory('work')}><Text style={[sModal.blockChooseText, {color: this.state.colorsCate.work}]}>Work</Text></TouchableOpacity>
                  <TouchableOpacity style={sModal.blockChoose} onPress={()=>this.getCategory('meeting')}><Text style={[sModal.blockChooseText, {color: this.state.colorsCate.meeting}]}>Meeting</Text></TouchableOpacity>
                </ScrollView>
              </View>
              <View style={sModal.lineBorder}></View>
              <View style={sModal.addNewTaskTitleCon}><Text style={sModal.addNewTaskTitle}>Choose time/date</Text></View>
              <View style={sModal.chooseTimeCon}>
                <View style={sModal.timeInputCon}>
                  <TextInput keyboardType='numeric' maxLength={2} style={sModal.timeInput} defaultValue={this.setTwoDigitsTime(String(this.state.displayTime.hour))} onChangeText={e=>this.getTimeInput(e, 'hour')}></TextInput>
                  <Text>:</Text>
                  <TextInput keyboardType='numeric' maxLength={2} style={sModal.timeInput} defaultValue={this.setTwoDigitsTime(String(this.state.displayTime.minute))} onChangeText={e=>this.getTimeInput(e, 'minute')}></TextInput>
                </View>

                <View style={sModal.timeInputCon}>
                  <TextInput keyboardType='numeric' maxLength={2} style={sModal.timeInput} defaultValue={this.setTwoDigitsTime(String(this.state.displayTime.date))} onChangeText={e=>this.getTimeInput(e, 'date')}></TextInput><Text>/</Text>
                  <TextInput keyboardType='numeric' maxLength={2} style={sModal.timeInput} defaultValue={this.setTwoDigitsTime(String(this.state.displayTime.month))} onChangeText={e=>this.getTimeInput(e, 'month')}></TextInput><Text>/</Text>
                  <TextInput keyboardType='numeric' maxLength={4} style={sModal.timeInput} defaultValue={String(this.state.displayTime.year)} onChangeText={e=>this.getTimeInput(e, 'year')}></TextInput>
                </View>
              </View>

              <View><Text style={[{textAlign: 'center'}, sAuth.errorMessage]}>{this.state.errorAddTask}</Text></View>
              <TouchableOpacity disable={this.state.disableAddTaskButton} style={sModal.buttonAddTask} onPress={()=>this.handleAddTask()}><Text style={sModal.buttonAddTaskText}>Add Task</Text></TouchableOpacity>

            </View>  
          </View>     

        </Modal>

      </View>

      <View style={sNav.bottomCon}>
        <View style={sNav.mainButtonCon}>

          <TouchableOpacity onPress={()=>this.bottomButtonChosen('Home')} style={sNav.buttonCon}>
            <View><Icon name="ios-home" type="ionicon" size={25} color={this.state.tintColors.tintColorHome}/></View>
            <View><Text style={{color: this.state.tintColors.tintColorHome}}>Home</Text></View>  
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.bottomButtonChosen('Task')} style={sNav.buttonCon}>
            <View><Icon name="ios-document" type="ionicon" size={25} color={this.state.tintColors.tintColorTask}/></View>
            <View><Text style={{color: this.state.tintColors.tintColorTask}}>Task</Text></View>  
          </TouchableOpacity>
          
        </View>


        <View>
          <TouchableOpacity 
            style={sNav.plusButtonCon}
            onPress={()=>{this.openTaskModal()}}>
            <Image source={require('../img/plusbutton.png')} style={{height: WIDTH/5, width: WIDTH/5}}/>
          </TouchableOpacity>
        </View>

      </View>

      </>
    )
  }
}


const sNav = StyleSheet.create({
  bottomCon: {
    height: 60,
    width: WIDTH,

    backgroundColor: '#ffffff'
  },
  mainButtonCon: {
    flexDirection: 'row',
  },

  plusButtonCon: {
    position: 'absolute',
    marginTop: -70,
    marginLeft: WIDTH/2 - WIDTH/10
  },

  buttonCon: {
    width: WIDTH/2,
    alignItems: 'center',
    justifyContent: 'center'
  },


})

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

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);