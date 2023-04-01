import { useEffect } from 'react';
import { Pressable, View, StyleSheet, Text, PixelRatio } from 'react-native';
import { useTheme, Divider, Card, Button, Icon } from '@rneui/themed';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';
import Sound from '../audio/Sound';


const fontScale = PixelRatio.getFontScale()


export default function ReadLine()
{
  const { current, translateCurrent } = useBook();
 
  useEffect(() => {
    translateCurrent();
  }, [current])

  const { line, characters } = current;
  console.log(current);
  return (
    <View style={sty.readLine}>
      <View style={sty.content}>
        <Line line={line} />
        <View style={sty.characters}>
          {/*<Characters characters={characters} />*/}
        </View>
      </View>
    </View>
  );
}


function Line({ line })
{
  const { mode } = useMode();

  if(mode === 'read')
    return <Text style={sty.english}>{line.english}</Text>
  else
    return (
      <View style={sty.line}>
        <LineSound mandarin={line.mandarin} />
        <Text style={sty.english}>{line.english}</Text>
      </View>
    );
}

function LineSound({ mandarin })
{
  return (
    <View style={sty.sound}>
      <Sound text={mandarin} shouldPlay={true}>
        <Icon type='antdesign' name='sound' size={40} />
      </Sound>
    </View>
  );
}


function Characters({ characters })
{
  return characters.map((c, i) => <CharacterContent c={c} key={i} />);

}
function CharacterContent({ c })
{
  const { mode } = useMode();
  const { mandarin, pinyin, english } = c;

  const content = (
    <View style={sty.charBox}>
      <Text style={sty.mandarin}>{mandarin}</Text>
      <Text style={sty.pinyin}>{pinyin}</Text>
      <Text style={sty.charEnglish}>{english}</Text>
      <Divider style={sty.divider} width={3}/>
      <PlayCharIcon />
    </View>
  );

  if(mode === 'read') return content;
  return content;
  return (
    <Sound text={mandarin}>
      { content }
    </Sound>
  );
}

function PlayCharIcon()
{
  const { mode } = useMode();
  const { theme } = useTheme();
  if(mode !== 'listen') return null;
  return (
    <Icon type='antdesign' name='playcircleo' size={35} color={theme.colors.primary} />
  );
}

const sty = StyleSheet.create({
  readLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  mandarin: {
    letterSpacing: 10,
    textAlign: 'center',
    fontSize: 40 / fontScale,
    fontWeight: '500',
  },
  english: {
    fontSize: 40 / fontScale,
  },
  pinyin: {
    fontSize: 20 / fontScale,
  },
  charEnglish: {
    fontSize: 20 / fontScale,
  },
  cardDivider: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  characters: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  charsContainer: {
    alignItems: 'center',
  },
  line: {
    position: 'relative',
    flexDirection: 'row',
  },
  sound: {
    padding: 10,
    position: 'absolute',
    top: 50,
    left: -50,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  divider: {
    width: '100%',
    margin: 10
  },
  playIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  charBox: {
    alignItems: 'center',
  },
});
