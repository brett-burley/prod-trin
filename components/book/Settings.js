import { createRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ListItem, useTheme, FAB, Divider, Text, Icon, Button, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';
import Popup from '../layout/Popup';
import { uppercaseFirst } from '../../lib/text/text';

export default function Settings({ close })
{

  return (
    <View style={sty.settings}>
      <SettingsTitle />
      <ModesItem close={close} />
      <GotoSection close={close} />
      <Back close={close} />
    </View>
  );
}


function SettingsTitle()
{
  return (
    <ListItem containerStyle={sty.listItem} bottomDivider>
      <ListItem.Content style={sty.listItemContent}>
        <View style={sty.settingsTitle}>
          <Icon type='material' name='app-settings-alt' />
          <ListItem.Title style={sty.listItemTitle}>Settings</ListItem.Title>
        </View>
      </ListItem.Content>
    </ListItem>
  );
}


function ModesItem({ close })
{
  const { mode, setMode } = useMode();
  const [expanded, setExpanded] = useState(false);
  const buttons = ['Read', 'Listen'];
  

  function onPress(index)
  {
    const newMode = buttons[index].toLowerCase();
    setMode(newMode);
    close();
  }

  return (
    <ListItem containerStyle={sty.listItem} bottomDivider>
      <ListItem.Content style={sty.listItemContent}>
        <ListItem.Accordion
          content={
            <ListItem.Content style={sty.listItemContent}>
              <ListItem.Title style={sty.listItemTitle}>
                Change Mode
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <ListItem.ButtonGroup
            buttons={buttons}         
            selectedIndex={buttons.indexOf(uppercaseFirst(mode))}
            onPress={value => onPress(value)}
            buttonContainerStyle={sty.modeBtnContainer}
            textStyle={sty.modeBtnText}
          />

        </ListItem.Accordion>
      </ListItem.Content>
    </ListItem>
  );
}


function GotoSection({ close })
{
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem style={sty.listItem} bottomDivider>
      <ListItem.Content style={sty.listItemContent}>
        <ListItem.Accordion
          content={
            <ListItem.Content style={sty.listItemContent}>
              <ListItem.Title style={sty.listItemTitle}>
                Change Location
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <SectionInput close={close} />
        </ListItem.Accordion>
      </ListItem.Content>
    </ListItem>
  );
}

function SectionInput({ close })
{
  const input = createRef();
  const { bookLength, setSection } = useBook();
  const [num, setNum] = useState(0);
  
  const disabled = num < 1 || num >= bookLength;
  const range = `1-${bookLength}`
  const errorMsg = `range: ${range}`;


  return (
    <View style={sty.gotoContent}>
      <Input
        containerStyle={sty.input}
        placeholder={`Enter location (${range})`}
        onChangeText={v => onChange(v)}
        errorMessage={errorMsg}
        ref={input}
      />

      <Button
        containerStyle={sty.gotoBtnContainer}
        onPress={onPress}
        disabled={disabled}
        size="lg"
      >
        {`Jump to location: ${num ? num : '-'}`}
      </Button>
    </View>
  );


  function onChange(v)
  {
    const value = parseInt(v);
    if(value < 1 || value >= bookLength) {
      input.current.shake();
      input.current.clear();
      setNum(0);
      return;
    }

    setNum(value);
  }


  function onPress()
  {
    close();
    setSection(num-1);
  }
}


function Back({ close })
{
  const navigation = useNavigation();

  function onPress()
  {
    close();
    navigation.navigate('Library');
  }

  return (
    <ListItem containerStyle={sty.listItem}>
      <ListItem.Content style={sty.listItemContent}>
        <Button onPress={onPress} containerStyle={sty.backBtn} type="outline">
          <View style={sty.backIcons}>
            <Icon type='ionicon' name='library-outline' containerStyle={sty.libraryIcon} />
            <Icon type='ionicon' name='return-down-back' />
          </View>
          <ListItem.Title style={sty.listItemTitle}>Back to Library</ListItem.Title>
        </Button>
      </ListItem.Content>
    </ListItem>
  );
}

const sty = StyleSheet.create({
  settings: {
    flex: 1,
  },
  listItem: {
    flex: 1,
  },
  listItemContent: {
    flex: 1,
    alignItems: 'center',
  },
  settingsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 20,
    margin: 10,
  },
  sliderBtn: {
    marginTop: 15,
    textAlign: 'center',
  },
  gotoContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modeBtnContainer: {
    width: 200,
    height: 80,
  },
  gotoBtnContainer: {
    margin: 15,
  },
  backBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  libraryIcon: {
    marginBottom: -5,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
});
