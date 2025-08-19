import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getpage } from '../api/user';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApiOneScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { postId } = route.params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getpage(postId);
                console.log('222222', response);

        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No post found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} />
        </TouchableOpacity>
        <Text style={styles.header}>Post Detail</Text>
      </View>
   <TouchableOpacity
        onPress={() => navigation.navigate('ApiTowScreen', { postId: post.userId })}
      >
      <View style={styles.card}>
        <Text style={styles.label}>UserId: {post.userId}</Text>
        <Text style={styles.label}>Id: {post.id}</Text>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{post.title}</Text>
        <Text style={styles.label}>Body:</Text>
        <Text style={styles.value}>{post.body}</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ApiOneScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     padding: 16 
    },
  header: { 
    fontSize: 22, 
    fontWeight: '600',
     marginLeft: 10 
    },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center'
     },
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  label: { 
    fontSize: 18,
     fontWeight: '600',
      marginVertical: 4 
    },
  value: { 
    fontSize: 16,
     marginBottom: 8 
    },
});
