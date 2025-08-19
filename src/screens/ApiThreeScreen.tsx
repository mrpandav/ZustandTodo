import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { postid } from '../api/user';
 
const ApiThreeScreen = () => {
  const [postId, setPostId] = useState<number | string>('');  

  const handlePostRequest = async () => {
    try {
       const response = await postid(Number(postId));  

       console.log('Response from Post API:', response.data);
      Alert.alert('Success', `Post ID ${postId} has been successfully posted.`);
    } catch (error) {
      console.error('Error in API call:', error);
      Alert.alert('Error', 'Failed to post data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post Data to API</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Post ID"
        value={postId}
        onChangeText={setPostId}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handlePostRequest}>
        <Text style={styles.buttonText}>Submit Post ID</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApiThreeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
