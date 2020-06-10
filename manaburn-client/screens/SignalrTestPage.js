import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SignalR from '@microsoft/signalr';

export default function SignalrTestPage() {
  const [connection, setConnection] = React.useState(null);
  const CONNECT = React.useCallback(() => {
    if (connection === null){
      let newConnection = new SignalR.HubConnectionBuilder()
      .configureLogging(SignalR.LogLevel.Debug)
      .withUrl("http://manaburn.atriarch.systems/ManaBurn")
      .build();
      newConnection.on("ReceiveMessage", (arg1, arg2) => {
        alert(`arg1: ${arg1}, arg2: ${arg2}`);
      });
      //alert(Object.keys(newConnection).join(","));
      alert(`Conn St: ${newConnection.connectionState},\nConn Strt: ${newConnection.connectionStarted}`);
      setConnection(newConnection);
    }
  },
  [connection, setConnection]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View>
          <TouchableOpacity
            style={styles.button}
            onPress={CONNECT}
          >
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {connection.start()
              .then(() => connection.invoke("AddToGroup", "TestSession")).catch(reason => alert(reason))}}
          >
            <Text>Add Group</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {connection.start()
              .then(() => connection.invoke("SendMessage", "Tobes","TestSession","Hello")).catch(reason => alert(reason))}}
          >
            <Text>Send Message</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {connection.start()
              .then(() => connection.invoke("RemoveFromGroup", "TestSession")).catch(reason => alert(reason))}}
          >
            <Text>Remove Group</Text>
          </TouchableOpacity>
        </View>                
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
      <Text>Footer</Text>
      </View>
    </View>
  );
}

function onPress (connection){
  alert("pressed");
  //connectionnewConnection.invoke("AddToGroup", "TestSession");
  // connection.start()
  //   .then(() => connection.invoke("AddToGroup", "TestSession"))
  //   .then(() => connection.invoke("SendMessage", "Tobes","TestSession","Hello"))
  //   .then(() => connection.invoke("RemoveFromGroup", "TestSession")); 
}

SignalrTestPage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
