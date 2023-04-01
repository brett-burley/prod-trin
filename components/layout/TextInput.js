import React from 'react';
import { Text, Input } from '@rneui/themed';

const TextInput = React.forwardRef((props, ref) =>
{
  const { title, required } = props;
  const errorMsg = required ? "required" : "optional";
  const placeholder = `Please enter a ${title.toLowerCase()}`

  return (
    <Input 
      ref={ref}
      errorMessage={errorMsg}
      label={<Label />}
      placeholder={placeholder} 
      onChangeText={value => ref.current = value}
    />
  );


  function Label()
  {
    return <Text>{title}</Text>  
  }
});

export default TextInput;
