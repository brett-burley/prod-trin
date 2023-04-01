import { View, Text, StyleSheet, Platform, PixelRatio } from 'react-native';
import { Divider } from '@rneui/themed';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';
import LineAudio from '../Audio/LineAudio';

const fontScale = PixelRatio.getFontScale()


export default function PageTitle()
{
  return (
    <View style={sty.header}>
      <LineEnglish />
      <LineMandarin />
      <Divider style={sty.divider} /> 
    </View>
  );
}


function LineMandarin()
{
  let body;
  const { mode } = useMode();
  const { line } = useBook();

  switch(mode) {
    case "Read":
      body = <MandarinText line={line} />
      break;
    case "Listen":
      body = (
        <LineAudio text={line.line.mandarin}>
          <MandarinText line={line} />
        </LineAudio>
      );
      break;
    default:
      body = <Text>No Mode</Text>
  }

  return (
    <View style={sty.lineChinese}>
      {body}
    </View>
  )
}



function LineEnglish()
{
  const { line } = useBook();
  const english = line.line.english;

  return (
    <Text style={sty.english}>
      {english}
    </Text>
  );  
}


function MandarinText({ line })
{

  return line.characters.map((c, i) => (
    <View key={i} style={sty.lineCharacters}>
      <Text style={sty.mandarin}>
        {c.mandarin}
      </Text>

      <Text style={sty.pinyin}>
        {c.pinyin}
      </Text>
    </View>
  ));
}




/*
*/


const sty = StyleSheet.create({
  header: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  lineChinese: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linePinyin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lineCharacters: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chinese: {
    width: '100%',
  },
  english: {
    textAlign: 'center',
    fontSize: 30 / fontScale,
    fontWeight: '400',
  },
  mandarin: {
    flexGrow: 1,
    letterSpacing: 10,
    fontSize: 40 / fontScale,
    fontWeight: '500',
  },
  pinyin: {
    flexGrow: 1,
    fontSize: 20 / fontScale,
    fontWeight: '300',
  },
  divider: {
    width: '90%',
    marginTop: 10,
  },
});
