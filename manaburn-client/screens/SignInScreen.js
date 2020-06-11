import * as React from 'react';
import {Keyboard, Text,View,StyleSheet,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import AuthContext from '../context/AuthContext'

export default function SignInScreen() {
  const [motd, setMotd] = React.useState(null);
  const [error, setError] = React.useState(null);

  const {signIn} = React.useContext(AuthContext);


  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <FontAwesome5 name="dice-d20" size= {150} color='#3235db'/>
          </View>
          <Text style={styles.getStartedText}> Welcome to Manaburn LifeTracker!</Text>
          {motd &&
            <View style={styles.errorContainer}>
              <Text
              style={styles.error}>
                <Icon name="exclamation-triangle" size= {20} color='yellow'/>
                {motd}
              </Text>
            </View>}
          {error &&
            <View style={styles.errorContainer}>
              <Text
              style={styles.error}>
                <Icon name="exclamation-circle" size= {20} color='red'/>
                {error}
              </Text>
            </View>}
          <TouchableHighlight style={[styles.buttonContainer,styles.loginButton]} underlayColor='#5cb85c' onPress={() => signIn(setError)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
// bg #494957
const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 32,
    color: 'rgba(96,100,109, 1)',
    marginBottom: 40,
    textAlign: 'center',
  },
  errorIcon:{
    width:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  errorContainer: {
    width: 250,
    minHeight: 25,
    marginBottom:5,
    alignItems:'center'
  },
  error: {
    fontSize: 20,
    marginLeft: 10,
  },
  loginButton:{
    backgroundColor:'#05a5d1',
  },
  buttonText:{
    fontWeight: 'bold',
    color: '#ecf0f1'
  },
  buttonContainer: {
    borderRadius:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 44,
    padding: 10,
    marginBottom: 10,
  },
});