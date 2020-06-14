import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Keyboard, TextInput, View, Text, Button} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as FeedbackApi from '../api/feedbackApi';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalScreen({ navigation, route }) {
  const { source } = route.params;
  const [feedback, setFeedback] = React.useState("");
  const FEEDBACK_MAX_LENGTH = 1000;
  const onSubmit = React.useCallback(async () => {
    const {id, success, error} = await FeedbackApi.SubmitFeedback({source, message:feedback});
    if(success== true){
      setFeedback("");
      alert('Submission received, thank you!');
    } else {
      alert(`There may have been a problem receiving your feedback :C - ${error}`);
    }
  },
  [feedback,setFeedback, source]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{flex:1}} behavior="padding">
        <SafeAreaView style={{flex:1}}>
          <View style={[{flex:0.2, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', padding: 10}]}>
            <MaterialIcons name="feedback" size={80} color='olive' style={[{paddingBottom:45, paddingLeft: 10}]} />
            <Text style={{ fontSize: 30 }}>{`Provide Feedback`}</Text>
          </View>
          <View style={{flex:0.2, paddingLeft:'5%', paddingRight:'5%'}}>
            <Text style={{ fontSize: 18, textAlign: 'center'}}>{`This will be a place to provide feedback on variaous features. Unfortunately it's text only for right now.`}</Text>
            <Text style={{ fontSize: 18 }}>{`Source: ${source}`}</Text>
          </View>
          <View style={{flex:0.5,padding:'5%',flex:1}}>
              <TextInput
                placeholder={'Type your feedback here!'}
                style={{ flex: 1, backgroundColor: '#fff', borderLeftColor:'#383838', borderBottomColor:'#383838', borderBottomWidth:2, borderLeftWidth:2}}
                multiline
                numberOfLines={4}
                onChangeText={text => setFeedback(text)}
                value={feedback}
                editable
                maxLength={FEEDBACK_MAX_LENGTH}
                />
            <Text>{`${FEEDBACK_MAX_LENGTH-feedback.length} characters remaining`}</Text>
          </View>
          <View style={{flex:0.1, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', paddingRight:'5%', paddingLeft:'5%'}}>
              <TouchableOpacity onPress={onSubmit} style={[{minHeight:'90%', flex:0.5, alignSelf:'flex-start'},styles.submitButton]} disabled={feedback.length<1}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>              
              <TouchableOpacity onPress={() => navigation.goBack()} style={[{minHeight:'90%', flex:0.5, alignSelf:'flex-end'},styles.backButton]}>
                <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    maxWidth: '40%',
    backgroundColor: '#5cb85c',
    //padding: 20,
    borderRadius: 5,
  },
  backButton: {
    maxWidth: '40%',
    backgroundColor: '#05a5d1',
    //padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    padding:10,
    alignSelf:'center',
    fontSize: 20,
    color: '#ecf0f1',
  }
});