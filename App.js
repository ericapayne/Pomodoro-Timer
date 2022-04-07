
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, Vibration, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';


const App = props => {
  const StartLabel = "Start";
  const StopLabel = 'Stop';

  const[userWorkTimer, setUserWorkTimer] = useState('');
  const [userBreakTimer, setUserBreakTimer] = useState('');
  //timer stopped
  const [timerStopped, setTimerStopped] = useState(true);
  //work timer
  const [workMinutes, setWorkMinutes] = useState('25');
  const [seconds, setSeconds] = useState('0');
  //break timer
  const [breakMinutes, setBreakMinutes] = useState('5');
  const [breakSeconds, setBreakSeconds] = useState('0');

  const [timerSwitch, setTimerSwitch] = useState(true);

  const [label, setLabel] = useState(StartLabel);
 

  useEffect(() => {
    let intervalID = null;
    

    if(!timerStopped) {
      setLabel(StopLabel);
      
      if(timerSwitch){
        if(workMinutes == 0 && seconds == 0) {
          Vibration.vibrate(1000);
          setTimerSwitch(!timerSwitch);
        } 
        else {       
          intervalID = setInterval(() => {  
            if(seconds == 0){
              setSeconds(59);
              setWorkMinutes(workMinutes - 1) 
            }
            else{
              setSeconds(seconds - 1);
            }
          }, 1000);        
        }
      }
      else if(!timerSwitch){
        if(breakMinutes == 0 && breakSeconds == 0){
          Vibration.vibrate(1000);
          
          setSeconds(59);
          setBreakMinutes(userBreakTimer);
          setBreakSeconds(0);
          setTimerSwitch(!timerSwitch);
          }
        else{
          intervalID = setInterval(() => {
            if(breakSeconds == 0){
              setBreakSeconds(59);
              setBreakMinutes(breakMinutes - 1);
            }
            else{
              setBreakSeconds(breakSeconds - 1);
            }           
          }, 1000);
        }
        
      }
    }
    else{
      setLabel(StartLabel);
    }
    return () => {
      clearInterval(intervalID);
    };
  });


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.timerHeader}>Work Timer</Text>
      <Text style= {styles.timerText}>{workMinutes}:{(seconds < 10) ? '0' + seconds:seconds}</Text>
      
       <View style = {styles.inputContainer}>
      <Text style={styles.labelText}>Work Mins: </Text>
      <TextInput keyboardType="numeric" value={userWorkTimer} onChangeText={(text) => setUserWorkTimer(text)} style={styles.input}/>
      </View>
      <View style = {styles.inputContainer}>
      <Text style={styles.labelText}>Break Mins: </Text>
      <TextInput keyboardType="numeric" value={userBreakTimer} onChangeText={(text) => setUserBreakTimer(text)} style={styles.input}/>
      </View>
      <TouchableOpacity style={styles.submitTimer} onPress={() => {       
        setWorkMinutes(Number(userWorkTimer));
        setBreakMinutes(Number(userBreakTimer));
           
      }}>
      <Text style={styles.submitText}>Submit Timer</Text>
      </TouchableOpacity>
      <View style = {styles.startResetButtons}>
      <TouchableOpacity style = {styles.startBtn}  onPress={() => setTimerStopped(!timerStopped)} >
        <Text style={styles.startText}>{label}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset} onPress={() => {
        setWorkMinutes(userWorkTimer) ,
         setSeconds(0),
         setBreakMinutes(userBreakTimer), 
         setBreakSeconds(0)}
         }>
         <Text style={styles.resetText}>Reset</Text>   
      </TouchableOpacity>
         </View>
      <Text style={styles.timerHeader}>Break Timer</Text>
      <Text style = {styles.timerText}>{breakMinutes}:{(breakSeconds < 10 ? '0' + breakSeconds:breakSeconds)}</Text>

      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex : 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    
    color: '#4A5568',
    fontSize: 70,
    fontWeight: 'bold'
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#4A5568',
    borderRadius: 10,
    minWidth: 40,
    maxWidth: 60,
    padding: 5,
    marginLeft: 5,
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
    justifyContent: 'center',
    alignContent:'center',
  },
  startResetButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  submitTimer:{
    marginRight: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  submitText:{
    color: '#0984e3',
    fontSize: 25,
  },
  startBtn: {
    marginRight: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  startText: {
    color: '#26CF08',
    fontSize: 25,
  },
  reset: {
    marginRight: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  resetText: {
    color: '#ff7675',
    fontSize: 25,
  },
  timerHeader: {
    
    color: '#00cec9',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    
  },
  labelText: {
    paddingRight: 10,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default App;
