import React from 'react';
import { ScrollView, View, Text, Button} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ModalScreen({ navigation, route }) {
  const { source } = route.params;
  return (
    <View style={{flex:1}}>
        <View style={[{flex:0.2, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', padding: 10}]}>
          <MaterialIcons name="feedback" size={80} color='olive' style={[{paddingBottom:45, paddingLeft: 10}]} />
          <Text style={{ fontSize: 30 }}>{`Provide Feedback`}</Text>
        </View>
      <View style={{flex:0.7}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, textAlign: 'center'}}>{`This will be a place to provide feedback on variaous features. Unfortunately it's text only for right now.`}</Text>
            <Text style={{ fontSize: 30 }}>{`Source: ${source}`}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={{flex:0.1}}>
        <Button style={{minHeight:'10%'}} onPress={() => navigation.goBack()} title="Done" />
      </View>
    </View>
  );
}