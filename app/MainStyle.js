
// This is main style
// COLOR CODE: 
// main blue: #5b83e3
// light blue: #81c7f5


// background very light blue: #f9fcff
// blue title font: #8b87b3

import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native"

const blue = {
  main: '#5b83e3',
  light: '#81c7f5',
  verylight: '#f9fcff',
}

const taskColor = {
  yellow: '#ffd506',
  red: '#d10263',
  green: '#1ed102',

  text: '#554e8f',
  title: '#8b87b3',

  gray: '#c6c6c8',
  blacksmoke: '#2b2b2b', 
  darkgray: '#7d7d7d',

  redError: '#9b1c31'
}

const borderRadiusMain = 4;


// VERTICAL DEVICE ONLY
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerHeight = 240;
const standardElementHeight = WIDTH*0.15
const marginSmall = WIDTH*0.05;

const size = {
  huge: WIDTH*0.075,
  big: WIDTH*0.06,
  medium: WIDTH*0.05,
  semimedium: WIDTH*0.045,
  semi: WIDTH*0.035,
  small: WIDTH*0.03,
}

const paddingSize = WIDTH*0.04;
const marginTopModal = HEIGHT*0.1

export const sHome = StyleSheet.create({
  header: {
    backgroundColor: blue.main,

    padding: marginSmall,
    justifyContent: 'space-around',
  },
  
  profileHeader: {
    height: standardElementHeight,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  hello: {
    fontSize: size.medium,
    color: 'white',
  },
  helloTasks: {
    fontSize: size.small,
    color: 'white',
  },

  avaFrame: {
    height: WIDTH*0.12,
    width: WIDTH*0.12,

    backgroundColor: '#ffffff33',
    borderRadius: 99,
  },

  reminderHeaderCon: {
    height: HEIGHT*0.18,
    width: '100%',
    backgroundColor: '#ffffff33',
    marginTop: marginSmall,

    borderRadius: borderRadiusMain,
    padding: paddingSize,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  reminderHeader: {
    justifyContent: 'space-around'
  },
  todayReminder: {
    color: 'white',
    fontSize: size.big,
  },
  workReminder: {
    color: 'white',
    fontSize: size.semi,
  },

  timeReminder: {
    color: 'white',
    fontSize: size.small,
  },
  
  bellReminderCon: {},
  backButtonCon: {
    height: size.medium*1.5,
    width: size.medium*3,
    borderWidth: 1.5,
    borderColor: '#ffffffb3',
    borderRadius:5,

    marginTop: marginSmall, 

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#ffffffb3',
    fontSize: size.semi,
  },


  // body
  
  body: {
    backgroundColor: blue.verylight,
    minHeight: HEIGHT - standardElementHeight,
  },

  title: {
    color: '#8b87b3',
    fontSize: size.semi
  },

  section: {
    margin: paddingSize,
  },

  taskLine: {
    height: WIDTH*0.18,
    width: '100%',

    marginTop: paddingSize,

    borderRadius: borderRadiusMain,
    elevation: 1,

    // style inside 
    alignItems: 'flex-end'
  },

  // Task widget style

  task: {
    height: WIDTH*0.18,
    width: '99%',
    padding: paddingSize*0.7,

    backgroundColor: "#ffffff",

    borderTopRightRadius: borderRadiusMain,
    borderBottomRightRadius: borderRadiusMain,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  taskTimeCon: {
    width: standardElementHeight
  },
  taskContentCon: {
    width: WIDTH*0.52
  },

  taskTimeText: {
    fontSize: size.small,
    color: taskColor.gray
  },
  taskContentTextNormal: {
    fontSize: size.semi,
    color: taskColor.text
  },
  taskContentTextLineThrough: {
    fontSize: size.semi,
    color: taskColor.gray,
    textDecorationLine: 'line-through'
  },


  
})

export const sTask = StyleSheet.create({
  body: {
    padding: paddingSize/2,
    paddingTop: 0,
  },
  project: {
    width: WIDTH*0.41,
    height: WIDTH*0.49,
    borderRadius: borderRadiusMain,
    marginTop: paddingSize*2,
    
    backgroundColor: '#ffffff',
    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  projectList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },

  // PROJECTS WIDGET

  iconCon: {
    height: standardElementHeight*1.2,
    width: standardElementHeight*1.2,
    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center'
    
  },

  titleProject: {
    fontSize: size.semimedium,
    color: taskColor.blacksmoke + 'cc',
    marginTop: paddingSize/2,
    marginBottom: paddingSize/2,
  },
  tasksProject: {
    fontSize: size.small,
    color: taskColor.gray
  },
})

export const sAuth = StyleSheet.create({
  background: {
    height: HEIGHT,
    backgroundColor: blue.main,
    padding: paddingSize
  },
  modalLogin: {
    height: HEIGHT*0.55,
    width: '100%',
    marginTop: marginTopModal,
    padding: paddingSize,

    backgroundColor: '#ffffffe6',
    borderRadius: borderRadiusMain,
    justifyContent: 'space-between',
    elevation: 1.5,
  },


  // Content 
  welcome: {
    fontSize: size.huge,
    fontWeight: "700",
    paddingBottom: paddingSize,
    color: taskColor.blacksmoke
  },
  signInToContinue: {
    fontSize: size.semi,
    color: taskColor.darkgray
  },

  modalLoginHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  toSignUpCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  toSignUpText: {
    color: blue.main,
    fontSize: size.semi,
    marginRight: 10,
  },

  titleInput: {
    fontSize: size.small,
    color: taskColor.darkgray
  },

  input: {
    height: standardElementHeight/1.2,

    borderColor: 'transparent',
    borderBottomColor: taskColor.gray,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBottom: 0,

    fontSize: size.medium
  },

  inputPass: {
    letterSpacing: 5
  },

  messCon: {
    width: 0.8*WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  errorMessage: {
    fontSize: size.small,
    color: taskColor.redError
  },
  forgotPass: {
    fontSize: size.semi
  },

  buttonAuth: {
    height: standardElementHeight - 5,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue.main,
    borderRadius: borderRadiusMain
  },

  buttonAuthText: {
    color: '#ffffff'
  },

  signInMethodButton: {
    height: standardElementHeight-5,
    width: '100%',

    backgroundColor: '#ffffffd9',
    borderRadius: 99,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: paddingSize,
    elevation: 1.5
  },

  signInMethodButtonText: {
    fontSize: size.semi,
    color: taskColor.blacksmoke
  },

  textOutsideModal: {
    fontSize: size.semimedium,
    color: '#ffffff'
  },

  orCon: {
    marginTop: paddingSize,
    marginBottom: paddingSize,
    alignItems: 'center'
  },

  // SIGN UP MODAL
  modalSignUp: {
    height: HEIGHT*0.7,
    width: '100%',
    marginTop: marginTopModal,
    padding: paddingSize,

    backgroundColor: '#ffffffe6',
    borderRadius: borderRadiusMain,
    justifyContent: 'space-between',
    elevation: 1.5,
  },
})

export const sModal = StyleSheet.create({
    // MODAL

    modalCon: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
  
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
  
    modalInside: {
      width: WIDTH,
      height: HEIGHT*0.5,
  
      backgroundColor: blue.verylight,
      padding: paddingSize,
  
    }, 
  
    crossButtonCon: {
      position: 'absolute',
      marginTop: -WIDTH/10
    },
  
    // form add input Modal 
    addNewTaskTitleCon: {
      alignItems: 'center',
      marginTop: WIDTH/25
    },
  
    addNewTaskTitle: {
      textAlign: 'center',
      fontSize: size.semi

    },
  
    lineBorder: {
      height: 1,
      width: '100%',
      backgroundColor: taskColor.gray,
    },
  
    // input 
    inputModal: {
      fontSize: size.medium
    },

    chooseTimeCon: {
      width: WIDTH,


      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },

    timeInputCon: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'

    },

    timeInput: {
      minWidth: 25,
      textAlign: 'center'
    },
  
    // choose Category
  
    scrollBlockChoose: {
      height: standardElementHeight,
      flexDirection: 'row',
      alignItems: 'center'
    },
    blockChoose: {
      padding: 5,
    },
    blockChooseText: {
      color: taskColor.gray,
      fontSize: size.semi
    },

    // button add task 
    buttonAddTask: {
      height: standardElementHeight,
      width: '100%',
      backgroundColor: blue.light,

      borderRadius: borderRadiusMain,
      justifyContent: 'center',
      alignItems: 'center',

      position: 'absolute',
      bottom: paddingSize,
      left: paddingSize

    },

    buttonAddTaskText: {
      fontSize: size.semimedium,
      color: '#ffffff'
    }
})
// TRANSPARENCY FOR HEX COLOR

// 100% — FF
// 99% — FC
// 98% — FA
// 97% — F7
// 96% — F5
// 95% — F2
// 94% — F0
// 93% — ED
// 92% — EB
// 91% — E8
// 90% — E6
// 89% — E3
// 88% — E0
// 87% — DE
// 86% — DB
// 85% — D9
// 84% — D6
// 83% — D4
// 82% — D1
// 81% — CF
// 80% — CC
// 79% — C9
// 78% — C7
// 77% — C4
// 76% — C2
// 75% — BF
// 74% — BD
// 73% — BA
// 72% — B8
// 71% — B5
// 70% — B3
// 69% — B0
// 68% — AD
// 67% — AB
// 66% — A8
// 65% — A6
// 64% — A3
// 63% — A1
// 62% — 9E
// 61% — 9C
// 60% — 99
// 59% — 96
// 58% — 94
// 57% — 91
// 56% — 8F
// 55% — 8C
// 54% — 8A
// 53% — 87
// 52% — 85
// 51% — 82
// 50% — 80
// 49% — 7D
// 48% — 7A
// 47% — 78
// 46% — 75
// 45% — 73
// 44% — 70
// 43% — 6E
// 42% — 6B
// 41% — 69
// 40% — 66
// 39% — 63
// 38% — 61
// 37% — 5E
// 36% — 5C
// 35% — 59
// 34% — 57
// 33% — 54
// 32% — 52
// 31% — 4F
// 30% — 4D
// 29% — 4A
// 28% — 47
// 27% — 45
// 26% — 42
// 25% — 40
// 24% — 3D
// 23% — 3B
// 22% — 38
// 21% — 36
// 20% — 33
// 19% — 30
// 18% — 2E
// 17% — 2B
// 16% — 29
// 15% — 26
// 14% — 24
// 13% — 21
// 12% — 1F
// 11% — 1C
// 10% — 1A
// 9% — 17
// 8% — 14
// 7% — 12
// 6% — 0F
// 5% — 0D
// 4% — 0A
// 3% — 08
// 2% — 05
// 1% — 03
// 0% — 00