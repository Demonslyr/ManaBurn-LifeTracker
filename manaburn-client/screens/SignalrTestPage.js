import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buffer } from "buffer"
import 'react-native-get-random-values'; // This polyfill needs to be above uuid
import { uuid } from 'uuidv4';
import { ScrollView } from 'react-native-gesture-handler';
import * as SignalR from '@microsoft/signalr';
import * as _ from 'lodash';


const initialPlayerState =     {
  playerHealth: 40,//make this whatever the game default health is and set game defult health off of player settings in the backend
  playerName: 'Tobrazoro',
  playerId: null,
  PlayerCommanderDamage: [],
  Emblems: [],
  Counters: [],
  Triggers: [],
  IsTurn: false
};

function playerStateReducer (prevState, action) {
  switch (action.type) {
    case 'HEALTH_INC':
      return {
        ...prevState,
        playerHealth: prevState.playerHealth+1,
      };
    case 'HEALTH_DEC':
      return {
        ...prevState,
        playerHealth: prevState.playerHealth-1,

      };
      case 'NAME_CHANGE':
      return {
        ...prevState,
        playerName: action.newPlayerName,
      };
    }
  };

  function pushStateCb (connection,playerState) {
    try{
      const jsonPlayerState = JSON.stringify(playerState);
      connection.invoke(signalrAcitons.Publish_State, "Tobes", playerState.playerName,jsonPlayerState);
    } catch (e) {
      alert(e)
    }
  };

  function getShortUuid() {
    const hexId = uuid().replace(/-/g, "");
    
    return Buffer.from(hexId, 'hex').toString('base64')
}

const signalrEvents = {
  Recieve_Message: "ReceiveMessage",
  Recieve_State: "ReceiveState",
  Request_State: "RequestState"  
}

const signalrAcitons = {
  Send_Message: "SendMessage",
  Add_To_Group: "AddToGroup",
  Remove_From_Group: "RemoveFromGroup",
  Publish_State: "PublishState"
}

export default function SignalrTestPage() {
  const [connection, setConnection] = React.useState(null);
  const [gameState, setGameState] = React.useState([]);
  const [groupId, setGroupId] = React.useState(getShortUuid());
  const [playerState, dispatchPlayerState] = React.useReducer(playerStateReducer, initialPlayerState);
  const debouncedStatePush = React.useCallback(_.debounce((conenction,playerState) => pushStateCb(conenction,playerState), 700),[]);

  const CONNECT = React.useCallback(async () => {
    if (connection == null || connection.connectionState === 'Disconnected'){
      let newConnection = new SignalR.HubConnectionBuilder()
      .configureLogging(SignalR.LogLevel.Debug)
      .withUrl("https://manaburn.atriarch.systems/ManaBurn")
      .withAutomaticReconnect(50)
      .build();
      await newConnection.start();
      newConnection.on("ReceiveMessage", async (arg1, arg2) => {
        alert(`arg1: ${arg1}, arg2: ${arg2}`);
      });
      newConnection.on("ReceiveState", async (state, player, messages) =>{
        alert(`Received from ${player}\n${state}`);
      });
      newConnection.on("RequestState", async () =>{
        alert(`Received requestForState`);
        try{
          if(!newConnection.connectionStarted){
            await connection.start();
          }
            const jsonPlayerState = JSON.stringify(playerState);
            await connection.invoke(signalrAcitons.Publish_State, "Tobes",jsonPlayerState);
          } catch (e) {
            alert(e)
          }
      },[newConnection,playerState]);
      alert(`Conn St: ${newConnection.connectionState},\nConn Strt: ${newConnection.connectionStarted}`);
      setConnection(newConnection);
    } else {
      alert(`Conn St: ${connection.connectionState},\nConn Strt: ${connection.connectionStarted}`);
    }
  },
  [connection, setConnection,playerState]);
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text>Header</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View>
          <TouchableOpacity
            style={(connection && connection.connectionState === 'Connected') ? styles.disabledButton : styles.button}
            onPress={CONNECT}
            disabled={connection && connection.connectionState === 'Connected'}
          >
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(!connection.connectionStarted){
                  await connection.start();
                }
                  await connection.invoke(signalrAcitons.Add_To_Group, groupId);
                } catch (e) {
                  alert(e)
                }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Add Group</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(!connection.connectionStarted){
                  await connection.start();
                }
                  await connection.invoke(signalrAcitons.Send_Message, "Tobes",groupId,"Hello");
                } catch (e) {
                  alert(e)
                }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Send Message</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Name: {playerState.playerName}</Text>
          <Text>Life: {playerState.playerHealth}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(!connection.connectionStarted){
                  await connection.start();
                }
                dispatchPlayerState({type: 'HEALTH_INC'});
                debouncedStatePush(connection,playerState);
              } catch (e) {
                alert(e)
              }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Life +</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(!connection.connectionStarted){
                  await connection.start();
                }
                dispatchPlayerState({type: 'HEALTH_DEC'});
                debouncedStatePush(connection,playerState);
              } catch (e) {
                alert(e)
              }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Life -</Text>
          </TouchableOpacity>
        </View>                
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(!connection.connectionStarted){
                  await connection.start();
                }
                await connection.invoke(signalrAcitons.Remove_From_Group, groupId);
                } catch (e) {
                  alert(e)
                }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Remove Group</Text>
          </TouchableOpacity>
        </View>  
        <View>
          <TouchableOpacity
            style={(connection == null || !connection.connectionStarted) ? styles.disabledButton : styles.button}
            onPress={async () => {
              try{
                if(connection.connectionStarted){
                  await connection.stop().done(alert('disconnected'));
                }
              } catch (e){
                alert(e);
              }
            }}
            disabled={connection == null || !connection.connectionStarted}
          >
            <Text>Disconnect</Text>
          </TouchableOpacity>
        </View>                        
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
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
  disabledButton: {
    alignItems: "center",
    backgroundColor: "red",
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
