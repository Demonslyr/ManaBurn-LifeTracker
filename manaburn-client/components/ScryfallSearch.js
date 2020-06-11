import * as React from 'react';
import { View, TouchableOpacity,StyleSheet} from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default function ScryfallSearch (navigate) {
    const [search,setSearch] = React.useState("");
    
    return(
        <View style={styles.container}>
                <View style={{flex:1}}>
                    <Input
                        placeholder='Search for a card'
                        onChangeText={value => setSearch(value)}
                        rightIcon={<Icon
                            name='search'
                            size={24}
                            color='black'
                            style={{alignItems:'center', justifyContent:'center'}}
                            onPress={ () => search && search.length>3 && navigate('ScryfallScreen',{url: `https://scryfall.com/search?q=${encodeURIComponent(search)}&unique=cards&as=grid`}) }
                        />}
                        rightIconContainerStyle={styles.button}
                    />
            </View>
      </View>);
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width: window.width,
        margin: 10,
        padding:4,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:4,
        borderColor:'#888',
        borderRadius:10,
        backgroundColor:'#fff'
    },
    button: {
      alignSelf: 'center',
      justifyContent:'center',
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderRadius:3
    }
});