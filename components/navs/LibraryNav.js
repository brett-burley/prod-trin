import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import Books from '../library/Books';
import Upload from '../library/Upload';


const Tab = createMaterialTopTabNavigator();


export default function LibraryNav()
{
  return (
    <Tab.Navigator
      initialRouteName="Books"
    >
      <Tab.Screen 
        name='Books'
        component={Books} 
        options={{
          tabBarLabel: "Your Books",
          tabBarIcon: () => <Ionicons name="book-outline" size={24} color="black" />,
        }}
      />

      <Tab.Screen 
        name='Upload'
        component={Upload}
        options={{
          tabBarLabel: "Upload your Own",
          tabBarIcon: () => <Ionicons name="cloud-upload-outline" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

