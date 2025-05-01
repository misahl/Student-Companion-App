import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, useColorScheme } from 'react-native';
import TaskList from './components/TaskList';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  
  // For theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detect the current system theme if user hasn't toggled manually
  const colorScheme = useColorScheme();
  const theme = isDarkMode || colorScheme === 'dark' ? 'dark' : 'light';

  const addTask = () => {
    if (task.trim()) {
      setTaskList([
        ...taskList,
        { key: Math.random().toString(), value: task, completed: false },
      ]);
      setTask('');
    }
  };

  const toggleTask = (key) => {
    setTaskList((prevTasks) =>
      prevTasks.map((item) =>
        item.key === key ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#111' : '#fff' },
      ]}
    >
      <Text style={[styles.header, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        Student Assistant App
      </Text>
      
      {/* Theme Toggle */}
      <View style={styles.switchContainer}>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginRight: 10 }}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#ccc', true: '#555' }}  // Colors for the track
          thumbColor={isDarkMode ? '#fff' : '#000'}  // Colors for the thumb
        />
      </View>
      
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === 'dark' ? '#222' : '#eee',
            color: theme === 'dark' ? '#fff' : '#000',
            borderColor: theme === 'dark' ? '#555' : '#ccc',
          },
        ]}
        placeholder="Enter task"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={task}
        onChangeText={setTask}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={addTask} />
      </View>
      <TaskList tasks={taskList} onToggle={toggleTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});