import { createStore, combineReducers}  from "redux"

const INIT_STATE = {
  sum : 0,
}

const user = {
  userData: null,
  userTasks: null
};

function reducer(state = INIT_STATE, action) {
  switch(action.type) {
    case 'INCREMENT': 
      return {
        sum: state.sum + action.payload
      }
    default: return state;
  }
}

function handleUser(state = user, action) {
  switch(action.type) {
    case 'saveInfoWhenLogin': 
      return {
        userData: action.payload.user,
        userTasks: action.payload.tasks
      }
      
    case 'updateTasks': 
      return {
        userData: state.userData,
        userTasks: action.payload.tasks
      }
    default: return state;
  }
}


const rootReducer = combineReducers({
  constReducer: reducer,
  handleUser: handleUser
})

export default createStore(rootReducer);