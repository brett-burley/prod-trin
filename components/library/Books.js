import { useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Image } from "@rneui/themed";
import useLibrary from '../../hooks/useLibrary';



export default function Books()
{
  const { navigate } = useNavigation();

  useEffect(() => {
      const book = {
        title: "The Book",
        id: "TheBook",
        author: "BB",
        imgUri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7L1rtG3JVR72zbXPOffdfV/dfW+/1N1qUD/UICEFYg2wAWMwRkICB4cQO45HkkEIGbGJjU38isbIwE6IbTLs4RHjMAwEiI0wIISwEBIS2AbZSCD06Na7pdbtd+t2q++95312zfyomrNm1a6199rn7HP2q2aP22ftWlWzHmut+r6aNauKUKVKlSpVqsyhfOOjz5+mVf7WVfA3rBK/Zo36rzzR9G9ZbfrHVolp0/V2bvRXP3+9v/Kj73vVbT877fLOmtC0C1ClSpUqVaoMk9s+wqfu7b30zTev7f6ZVXJfvdbs3XOC+heON/21hriTjue2Tz...",
        textUri: false,
        img: null
      }

      navigate('Book', { book });
  }, [])

  return (
    <View style={sty.books}>
      <AllBooks />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
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

