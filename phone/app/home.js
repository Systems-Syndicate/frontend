import React from 'react';
import { Button } from 'react-native';


export default function Home () {

  return (
    <Button
    title="Go to Jane's profile"
    onPress={() =>
      navigation.navigate('Profile', { name: 'Jane' })
    }
  />
  )
  
}
