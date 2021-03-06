import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import ScryfallSearch from '../components/ScryfallSearch';

export default function HomeGameScreen({navigation, route}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
      <View style={styles.container}>
          <View style={{flex:1}}>
            <Text>Top</Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <FontAwesome5 name="user" size= {20} color='#4f5355'/>
              <Text>Local Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <FontAwesome5 name="users" size= {20} color='#4f5355'/>
              <Text>Network Game</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, width:'100%'}}>
            {ScryfallSearch(navigation.navigate)}
          </View>
          <View style={{flex:2}}>
            <Text>Bottom</Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
// bg: #121313
// icon: #4f5355
// HomeGameScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems:'center'
  }
});
