import { Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import Webpage from '../screens/Webpage';
import Library from '../screens/Library';
//import Book from '../book/Book';

const Tab = createBottomTabNavigator();

export default function ScreenNav()
{
  let routeName = Platform.OS === 'web' ? 'Webpage' : 'Library';
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routeName}
        sceneContainerStyle={{ 
          backgroundColor: '#eeeeff',
        }}
      >
        <Tab.Screen
          name='Webpage'
          component={Webpage}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
      
        <Tab.Screen 
          name='Library'
          component={Library} 
          options={{
            title: 'Library',
            tabBarIcon: () => <Icon type='ionicon' name='library-outline' size={24} color="black" />,
            headerShown: false,
            tabBarActiveBackgroundColor: '#ccc',
            tabBarActiveTintColor: '#000',
          }}
        />

        {/*
        <Tab.Screen 
          name='Book'
          component={Book}
          options={{
            tabBarStyle: { display: 'none' },
            headerShown: false,
            title: 'Read',
            tabBarIcon: () => <Ionicons name="reader-outline" size={24} color="black" />,
          }}
        />
        */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
