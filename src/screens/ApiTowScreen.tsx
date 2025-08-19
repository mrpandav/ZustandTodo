import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getComments } from '../api/user';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApiTowScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { postId } = route.params;

  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(postId);
        console.log('❤️❤️❤️❤️', response);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!comments.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No comments found</Text>
      </View>
    );
  }

  const renderComment = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Comment ID: {item.id}</Text>
      <Text style={styles.label}>Name: {item.name}</Text>
      <Text style={styles.label}>Email: {item.email}</Text>
      <Text style={styles.label}>Body:</Text>
      <Text style={styles.value}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} />
        </TouchableOpacity>
        <Text style={styles.header}>Post {postId} Comments</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderComment}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default ApiTowScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 2,
  },
  value: {
    fontSize: 14,
    marginBottom: 8,
  },
});
