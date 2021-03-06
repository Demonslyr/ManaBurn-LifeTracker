import * as React from 'react';
import {WebView} from 'react-native-webview';

export default function WebviewScreen({navigation,route}) {
    const {url} = route.params;
    return(
        <WebView
        allowsBackForwardNavigationGestures={true}
        source={{ uri: url }}
      />
    );
}