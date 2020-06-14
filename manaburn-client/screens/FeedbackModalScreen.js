import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput, View, Text, Button} from 'react-native';
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
          <View style={{flex:0.2}}>
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
          <View style={{flex:0.1,flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', paddingRight:'5%'}}>
            <Button style={{minHeight:'10%'}} onPress={onSubmit} title="Submit" />
            <Button style={{minHeight:'10%'}} onPress={() => navigation.goBack()} title="Done" />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}