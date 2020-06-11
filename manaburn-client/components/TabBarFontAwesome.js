import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarFontAwesome(props) {
  return (
    <FontAwesome
      name={props.name}
      size={props.size}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
