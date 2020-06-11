import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';

export default function HomeGameScreen({navigation, route}) {
  return (
    <View style={styles.container}>
        <View style={{flex:1}}>
          <Text>Top</Text>
        </View>
        <View style={{flex:2}}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <FontAwesome5 name="user" size= {20} color='#4f5355'/>
            <Text>Local Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <FontAwesome5 name="users" size= {20} color='#4f5355'/>
            <Text>Network Game</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <Text>Bottom</Text>
        </View>
    </View>
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
