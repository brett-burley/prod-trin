import { View, Text, StyleSheet } from 'react-native';
import {  Divider, TabView } from '@rneui/themed';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';

import Controls from './Controls';
import Read from './Read';
import ReadNav from '../navs/ReadNav';
//import Listen from './Listen';

function Learn(){
 return <Text>Learn</Text>;
}

export default function Page()
{
  return (
    <View style={sty.pages}>
      <View style={sty.read}>
        <PageTabs />
      </View>

      <View style={sty.controls}>
        <Controls />
      </View>
    </View>
  );
}

function PageTabs()
{
  const { setSection } = useBook();

  return (
    <TabView
      containerStyle={sty.tabView}
      onSwipeStart={direction => swiped(direction)}
    >
      <TabPage />
    </TabView>
  );


  function swiped(dir)
  {
    const value = dir === 'right' ? 1 : -1;
    setSection(value);
  }
}


function TabPage()
{
  const { mode } = useMode();
  const item = mode === 'learn' ? <Learn /> : <ReadNav />

  return (
    <TabView.Item style={sty.tabViewItem}> 
      {item}
    </TabView.Item>
  );
}

const sty = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabViewItem: {
    width: '100%',
    height: '100%',
  },
  pages: {
    flex: 1,
    backgroundColor: 'rgba(245, 225, 200, 0.5)',
  },
  read: {
    flex: 8,
  },
  controls: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
