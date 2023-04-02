import { useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider, Button, Card, Image } from "@rneui/themed";
import useLibrary from '../../hooks/useLibrary';


export default function Books()
{
  return (
    <View style={sty.books}>
      <View style={sty.booksSection}>
        <Text style={sty.sectionTitle}>Free Books</Text>
        <View style={sty.booksRow}>
        <AllBooks />
        </View>
      </View>

      <Divider width={1} insertType="left" color="#2089dc" style={sty.divider} />

      <View style={sty.booksSection}>
        <Text style={sty.sectionTitle}>Your Books</Text>
        <View style={sty.booksRow}>
        </View>
      </View>
    </View>
  );
}


function AllBooks()
{
  const { titles } = useLibrary();
  const { navigate } = useNavigation();

  return titles.map((t, i) => {
    return (
      <Pressable 
        key={i}
        onPress={() => navigate('Book', { book: t })}
        style={sty.pressable}
      >
        <Card 
          containerStyle={sty.cardContainer}
          wrapperStyle={sty.cardWrapper}
        >
          <Card.Title style={sty.title}>
            {t.title}
          </Card.Title>

          <Card.Divider />
          <BookImage t={t} />
          <Card.Divider />

          <Card.Title style={sty.text}>
            {t.author}
          </Card.Title>
        </Card>
      </Pressable>
    );
  });
}

function BookImage({ t })
{
  let source;
  if(t.img)
   source = t.img; 
  else
    source = { uri: t.imgUri }

  const title = t.textUri ? 'free' : 'yours';
  return (
    <>
      <Image
        style={sty.bookImg}
        source={source}
      />
      <Text style={sty.free}>{title}</Text>
    </>
  );
}



const sty = StyleSheet.create({
  books: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  booksSection: {
    flex: 1,
  },
  booksRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    margin: 10,
    fontSize: 25,
    fontWeight: "500",
  },
  divider: {
    width: '90%',
    margin: 20,
  },
  pressable: {
    height: 300,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  cardContainer: {
    margin: 0,
    backgroundColor: '#fffef7',
    width: 180,
    height: '100%',
  },
  bookImg: {
    width: 160,
    height: 150,
  },
  title: {
    fontSize: 15,
  },
  text: {
    fontSize: 12,
  },
  free: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    margin: 5,
  },
});
