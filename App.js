/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View, ActivityIndicator, ScrollView, Text, TextInput, Button
} from 'react-native';
import { decode } from './Base64';

const App = () => {

  const [isLoading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://run.mocky.io/v3/5a864f6f-c85f-4b5c-a74d-d8a0407f59ec');
  const [encodedObj, setEncodedObj] = useState('');
  const [decodedObj, setDecodedObj] = useState('');

  const triggerApi = () => {
    if (url && url !== '') {
      setLoading(true)
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            let objKeys = Object.keys(json);
            let tempDecodedObj = { ...json };
            objKeys.forEach((v, i) => {
              tempDecodedObj[v] = decode(json[v])
              if (i === objKeys.length - 1) {
                setEncodedObj(JSON.stringify(json, null, 2));
                setDecodedObj(JSON.stringify(tempDecodedObj, null, 2))
              }
            })
          } else {
            setEncodedObj('');
            setDecodedObj('');
          }
        })
        .catch((error) => {
          console.error(error)
          setEncodedObj('');
          setDecodedObj('');
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => { triggerApi() }, [])

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <ScrollView style={{ marginBottom: 10 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {isLoading ?
          <ActivityIndicator size="large" />
          :
          <>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Encoded JSON :-</Text>
            <Text style={{ color: '#000' }}>{encodedObj}</Text>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Decoded JSON :-</Text>
            <Text style={{ color: '#000' }}>{decodedObj}</Text>
          </>
        }
      </ScrollView>
      <View>
        <TextInput style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10, marginBottom: 10 }} onChangeText={setUrl} value={url} />
        <Button title="FETCH" onPress={triggerApi} />
      </View>
    </View>
  );
};

export default App;
