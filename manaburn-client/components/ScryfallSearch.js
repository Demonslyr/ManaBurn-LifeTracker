import * as React from 'react';
import { View, Button, Icon} from 'react-native';
import { Input } from 'react-native-elements';

export default function ScryfallSearch (navigate) {
    [search,setSearch] = React.useState("");
    
    return(
        <View style={{flexDirection:'row', width: window.width, margin: 10, padding:4, alignItems:'center', justifyContent:'center', borderWidth:4, borderColor:'#888', borderRadius:10, backgroundColor:'#fff'}}>
            <View style={{flex:4}}>
                <Input
                    placeholder='Search for a card'
                    onChangeText={value => setSearch(value)}
                />
        </View>
        <View style={{flex:1}}>
          <Button onPress={ () => navigate('webviewScreen',{url: `https://scryfall.com/search?q=${encodeURIComponent(search)}&unique=cards&as=grid`}) }>
            <Icon
                name='search'
                size={24}
                color='black'
            /> 
          </Button>
        </View>
      </View>);
}