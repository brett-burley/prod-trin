import { View, StyleSheet } from 'react-native';
import PageTitle from './PageTitle';
import PageBody from './PageBody';

export default function Line()
{
  return (
    <View style={sty.tabPage}>
      <View style={sty.tabTitle}>
          <PageTitle />
      </View>
      <View style={sty.tabBody}>
        <PageBody />
      </View>
    </View>
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
  tabPage: {
    flex: 1,
  },
  tabTitle: {
    flex: 2,
  },
  tabBody: {
    flex: 5,
  },
});
