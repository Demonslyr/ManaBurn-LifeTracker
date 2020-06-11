import * as React from 'react';
import { Icon } from 'react-native-elements';

export default function FeedbackIcon (navigation, source) {
    return(<Icon
        iconStyle='solid'
        name='info-circle'
        type='font-awesome-5'
        color = 'grey'
        onPress={() => navigation.navigate('FeedbackStack', { screen: 'FeedbackModal', params: {source} })}
        style={{padding:10}}
        />);
}