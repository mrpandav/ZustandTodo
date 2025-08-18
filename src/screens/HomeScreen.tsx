import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import useTodoStore from "../store/useTodoStore";
 
const HomeScreen = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useTodoStore();
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
const [isHydrated, setIsHydrated] = useState(false);


  const handleAdd = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText);
      setNewTodoText("");
    }
  };
  const handleEditPress = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleSaveEdit = () => {
    if (editingTodoText.trim()) {
      editTodo(editingTodoId, editingTodoText );
      setEditingTodoId(null);
      setEditingTodoText("");
    }
  };

    const Delete = (id) => {
    Alert.alert(
      'Delete ',
      'Are you sure you want to delete this list ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteTodo(id) },
      ],
      { cancelable: true }
    );
  };


  
  const renderItem = ({ item }) => (
    <View style={styles.renderitem}>
      {editingTodoId === item.id ? (
        <TextInput
          value={editingTodoText}
          onChangeText={setEditingTodoText}
          style={{ flex: 1, borderWidth: 1, borderColor: "blue", padding: 5 }}
        />
      ) : (
        <Text
          style={{
            flex: 1,
            textDecorationLine: item.completed ? "line-through" : "none",
          }}
        >
          {item.text}
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>
        {editingTodoId === item.id ? (
          <Button title="Save" onPress={handleSaveEdit} />
        ) : (
          <>
            <Button
              title="Edit"
              onPress={() => handleEditPress(item.id, item.text)}
            />
            <TouchableOpacity>
              <Button
                title="Delete"
               onPress={() => Delete(item.id)} color="red" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          value={newTodoText}
          onChangeText={setNewTodoText}
          />
        <TouchableOpacity style={styles.add} onPress={handleAdd}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={todos}
         showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
        />
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#838383",
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 30,
    backgroundColor: "#28a745",
    borderRadius: 8,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  renderitem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
