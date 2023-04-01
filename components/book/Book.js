import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import BackBtn from '../extras/BackBtn';
import Page from './Page';


export default function Book({ route, navigation })
{
  const [loaded, setLoaded] = useState();
  const { loadBook } = useBook();

  useEffect(() => {
  {/*
    if(!loaded) {
      (async () => {
        const { book } = route.params;
        const { id, free } = book;
        await loadBook(id, free);
        setLoaded(true);
      })();
    }
    */}
  }, []); 


  if(!loaded) return <NotLoaded />

  return (
    <View style={sty.book}>
      <Page />
    </View>
  );
}

//< NOT LOADED BUTTON
function NotLoaded()
{
  const onPress = () => navigation.navigate('library');
  return (
    <View style={sty.notLoaded}>
      <Badge
        value="Your Book could not Loaded"
        badgeStyle={sty.badge}
        status="warning"
        textStyle={sty.badgeText}
      />
      <BackBtn onPress={onPress}>
        Go Back
      </BackBtn>
    </View>
  );
}


const sty = StyleSheet.create({
  book: {
    flex: 1,
  },
  notLoaded: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    height: 70,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    border: 'none',
  },
  badgeText: {
    fontSize: 25,
    textShadow: '2px 2px 5px #bbb',
    margin: 10,
    color: '#eee',
  },
});
