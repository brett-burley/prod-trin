import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Dialog } from '@rneui/themed';

export default function Popup({ show, close, children })
{
  const [visible, setVisible] = useState();

  useEffect(() => {
    if(show)
      setVisible(true);
    else
      setVisible(false);
  }, [show])

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={onPress}
      backdropStyle={{ padding: 0 }}
    >
      <Dialog.Actions>
        <Dialog.Button onPress={onPress}>
          <Icon size={25} type="font-awesome" name="close" />
        </Dialog.Button>
      </Dialog.Actions>

      <Dialog.Actions>
        { children }
      </Dialog.Actions>
    </Dialog>
  );

  function onPress()
  {
    setVisible(false)
    close();
  }
}

const sty = StyleSheet.create({
  popup: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    position: 'relative',
    width: '50%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    top: 0,
    left: '98%',
  },
});
