import {createStore} from 'redux';
import rootReducer from './reducer';
import {fetchDatabaseState} from './lib/datebase';

const initialStateFactory=()=>({
 tasks:[],
 ideas:[],
 appProperties:{
     showNotYetTasks:true,
     fullscreen:false,
     calendarSystem:'en-US',
     firsrDayOfWeek:1,
     startupTab:'tasks',
 },
 appUI:{
    FABRaised:false,
    currentTab:'tasks',
 },  
});

const fetchState=()=>fetchDatabaseState()|| initialStateFactory();
const defaultState =fetchState();
const store = createStore(rootReducer, defaultState);

export default store;