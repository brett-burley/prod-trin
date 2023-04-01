import { forwardRef, useState, useRef, useEffect } from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme, Text, Divider, Dialog, Card, Button, Input, Icon } from '@rneui/themed';
import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import useLibrary from '../../hooks/useLibrary';
import { convertToBook, titleToId } from '../../lib/text/text';
import TextInput from '../layout/TextInput';
import Popup from '../layout/Popup';
import storage from '../../lib/storage/storage';


const maxLength = 200;

export default function Upload()
{
  const navigation = useNavigation();
  const [error, setError] = useState();
  const { saveTitle } = useLibrary();
  const titleRef = useRef('');
  const authorRef = useRef('');
  const imgRef = useRef('');
  const textRef = useRef('');

  return (
    <View style={sty.upload}>
      <Card containerStyle={sty.card} wrapperStyle={sty.cardWrapper}>
        <Card.Title>Upload Here</Card.Title>

        <TextInput ref={titleRef} title="Title" required={true} /> 
        <TextInput ref={authorRef} title="Author" required={false} /> 
        
        <Divider style={sty.divider} />

        <UploadsSection>
          <ImageUpload ref={imgRef} />
          <TextUpload ref={textRef} />
        </UploadsSection>

        <SaveButton onPress={saveBook} />

        <ErrorPopup />
      </Card>
    </View>
  );


  async function saveBook()
  {
    const title = typeof titleRef.current !== 'string' ? '' : titleRef.current;
    const author = typeof authorRef.current !== 'string' ? '' : authorRef.current;
    const imgUri = imgRef.current;
    const book = textRef.current;
   
    console.log(title);  
    console.log(author);
    console.log(imgUri);
    console.log(book);
    if(!title.length || !book.length) {
      setError(true);
    }
    
    const bookSaved = await convertToBook(book);
    if(!bookSaved)
      setError(true);

    const newTitle = {
      title,
      id: titleToId(title),
      author,
      imgUri,
      img: null,
      free: true,
    }

    await saveTitle(newTitle);
    navigation.navigate('Books');
  }


  function ErrorPopup()
  {
    if(!error) return null;

    return (
      <Popup show={error}>
        <Text style={sty.errorTitle}>Ops! Something is missing</Text>
        <Text style={sty.errorText}>Upload must have a Title and Text</Text>
      </Popup>
    )
  }
}

function UploadsSection({ children })
{
  return (
    <View style={sty.uploadsContainer}>
      <View style={sty.imageSection}>
        {children[0]}
      </View>

      <View style={sty.textSection}>
        {children[1]}
      </View>
    </View>
  );
}


const ImageUpload = forwardRef((props, ref) => 
{
  const [showImg, setShowImg] = useState();

  return (
    <View style={sty.uploadOuter}>
      <UploadText text="Image" errorMsg="optional" />
      <View style={sty.uploadInner}>
        <ImageBody />
      </View>
    </View>
  );

  function ImageBody()
  {
    const { theme } = useTheme();
    if(showImg)
      return <Image style={sty.imageSize} source={{ uri: ref.current }} />

    return (
      <UploadButton onPress={uploadImage}>
        Upload Image
        <Icon size={24} color={theme.colors.primary} type="font-awesome" name="file-image-o" />
      </UploadButton>
    );
  }
 

  async function uploadImage()
  {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: 'image/*',
      });

      ref.current = doc.uri;
      setShowImg(true);
    } catch(e) {
      console.error(e);
      setShowImg(false);
    }
  }
});



const TextUpload = forwardRef((props, ref) => 
{
  const [show, setShow] = useState();

  return (
    <View style={sty.uploadOuter}>
      <UploadText text="Text" errorMsg="required" />
      <UploadBody /> 
    </View>
  );

  function UploadBody()
  {
    if(show)
      return <TextBox />
    return <UploadButtons />
  }
  
  function TextBox()
  {
    return (
      <View style={sty.uploadInner}>
        <Button 
          containerStyle={sty.deleteBtn}
          onPress={() => setShow(false)}
        >
          X
        </Button>
        <Text>{ref.current}</Text>
      </View>
    ); 
  }

  function UploadButtons()
  {
    const { theme } = useTheme();
    return (
      <View style={sty.uploadInner}>
        <UploadButton onPress={pasteText}>
          Paste from Clipboard
          <Icon color={theme.colors.primary} size={24} type="font-awesome" name="paste" />
        </UploadButton>


        <UploadButton onPress={uploadText}>
          Upload from File 
          <Icon color={theme.colors.primary} size={24} type="material-community" name="file-upload" />
        </UploadButton>
      </View>

    );
  }
  
  async function pasteText()
  {
    try {
      const pastedText = await Clipboard.getStringAsync();
      ref.current = pastedText;
      setShow(true);
    } catch(e) {
      console.error(e);
      setText('');
    } 
  }


  async function uploadText()
  {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: 'text/*'
      });
      
      let text;
      if(Platform.OS === 'web')
        text = await doc.file.text();
      else
        text = await FileSystem.readAsStringAsync(doc.uri);

      ref.current = text;
      setShow(true);
    } catch(e) {
      console.log(e);
      return '';
    }
  }
});


function UploadText({ text, errorMsg })
{
  return (
    <View style={sty.uploadText}>
      <Text>{`${text} - `}</Text>
      <Text style={{ color: '#EF476F' }}>{errorMsg}</Text>
    </View>
  );
}


function UploadButton({ children, onPress })
{
  return (
    <Button
      onPress={onPress}
      titleStyle={{ margin: 10 }}
      type="outline"
      containerStyle={{ minWidth: '50%' }}
    >
      { children }
    </Button>
  );
}

function SaveButton({ onPress })
{
  return (
    <View style={sty.saveBook}>
      <Button 
        onPress={onPress}
        color="error" 
        size="lg"
      >
        Upload Now
      </Button>
    </View>
  );
}


const sty = StyleSheet.create({
  upload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '70%',
    height: '90%',
    padding: 30,
  },
  cardWrapper: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 20,
    margin: 20,
  },
  uploadsContainer: {
    height: '50%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageSection: {
    width: '30%',
    height: '100%',
  },
  textSection: {
    width: '70%',
  },
  uploadOuter: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  uploadInner: {
    position: 'relative',
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    left: '95%',
  },
  divider: {
    margin: 10,
  },
  uploadText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageBox: {
    flexGrow: 1,
  },
  imageSize: {
    width: 200,
    height: 250,
  },
  uploadImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
  textBox: {
    position: 'relative',
    width: '70%',
    height: '100%',
  },
  textUpload: {
    flex: 1,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    position: 'absolute',
    top: 0,
    left: '90%',
  },
  pasteTextBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtons: {
    alignSelf: 'center',
    gap: 20
  },
  uploadBtnTitle: {
    fontSize: 18,
    margin: 10,
    color: '#fff',
  },
  inputContainer: {
    paddingLeft: 30, 
    paddingRight: 30,
  },
  pasteLabel: {
    fontSize: 20,
    textAlign: 'center',
  },
  pasteText: {
    height: 100,
    alignText: 'center',
  },
  saveBook: {
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtn: {
    marginTop: 10,
  },
  dialog: {
    width: '25%',
    textAlign: 'center',
  },
  nameInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    fontSize: 15,
  },
  nonError: {
    color: '#439946',
    fontSize: 15,
  },
});


/*
function UploadCard()
{
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const nameRef = useRef();
  const authorRef = useRef('');

  return (
      <Card.Title>Upload Here</Card.Title>

      <NameInput nameRef={nameRef} setName={setName} />
      <Card.Divider style={sty.divider} />

      <AuthorInput authorRef={authorRef} />
      <Card.Divider style={sty.divider} />

      <View style={sty.imgAndText}>
        <UploadImage />
        <Divider style={sty.divider} orientation="vertical" />
        <UploadText text={text} setText={setText} />
      </View>

      <SaveBook save={save} />
    </Card>
  );

  async function save()
  {
    if(!name) {
      nameRef.current.shake();
      return false;
    }

    if(!text && (text.length > maxLength)) {
      return false;
    }
    
    console.log('calling convertToBook', authorRef.current);
    await convertToBook(name, authorRef.current, '/images/covers/noCover.jpg', text);
    return true;
  }
}




function NameInput({ nameRef, setName })
{
  const label = <Text style={sty.uploadText}>Name</Text>;

  return (
    <Input 
      ref={nameRef}
      errorMessage="required"
      label={label}
      placeholder="Enter the name" 
      containerStyle={sty.inputContainer}
      onChangeText={value => setName(value)}
    />
  );
}


function AuthorInput({ authorRef })
{
  const label = <Text style={sty.uploadText}>Author</Text>;

  return (
    <Input 
      ref={authorRef}
      errorMessage="optional"
      label={label}
      placeholder="Enter the author" 
      containerStyle={sty.inputContainer}
    />
  );
}

function UploadText({ text, setText })
{
  if(text.length > 0) {
    const show = text.substring(0, 200);
    return (
      <View style={sty.textBox}>
        <Button
          onPress={() => setText('')}
          containerStyle={sty.removeText}
        >
          X
        </Button>
        <Text>{show}</Text>
        <Text>.......</Text>
      </View>
    );
  }
  return (
    <View style={sty.textBox}>
      <Text style={sty.uploadText}>Text</Text>
      <View style={sty.textUpload}>
        <UploadButtons text={text} setText={setText} />
      </View>
    </View>
  );
}


function UploadImage()
{
  const [uri, setUri] = useState();

  if(uri) {
    return (
      <View style={sty.imageBox}>
        <Image style={sty.imageSize} source={uri} />
      </View>
    );
  }

  return (
    <View style={sty.imageBox}>
      <Text style={sty.uploadText}>
        Image
      </Text>
      <View style={sty.uploadImage}>
        <Button
          onPress={uploadImage}
        >
          Upload Image
        </Button>
      </View>
    </View>
  );


  async function uploadImage()
  {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: 'image/*',
      });

      setUri(doc.uri);
    } catch(e) {
      console.error(e);
      setUri(null);
    }
  }
}


function UploadButtons({ text, setText })
{
  const textUpload = text.length > 0;

  return (
    <View style={sty.uploadButtons}>
      <Button
        onPress={pasteText}
        size="lg"
      >
        <View>
          <Text style={sty.uploadBtnTitle}>Paste from Clipboard</Text>
          <Icon size={24} color="#fff" type="font-awesome" name="paste" />
        </View>
      </Button>

      <Button
        onPress={filePress}
        size="lg"
      >
        <View>
          <Text style={sty.uploadBtnTitle}>Upload from File</Text>
          <Icon size={24} color="#fff" type="material-community" name="file-upload" />
        </View>
      </Button>
    </View>
  );

  async function filePress()
  {
    try {
      const fileText = await getLocalFile(); 
      setText(fileText);
    } catch(e) {
      console.error(e);
      setText('');
    }
  }

  async function pasteText()
  {
    try {
      const pastedText = await Clipboard.getStringAsync();
      setText(pastedText)
    } catch(e) {
      console.error(e);
      setText('');
    } 
  }
}




async function getLocalFile()
{
  try {
    let text;
    const doc = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'text/*'
    });

    if(Platform.OS === 'web')
      return await doc.file.text();
    else
      return await FileSystem.readAsStringAsync(doc.uri);
  } catch(e) {
    console.log(e);
    return '';
  }
}

*/

