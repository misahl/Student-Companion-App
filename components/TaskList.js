import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function TaskList({ tasks = [], onToggle }) {
  return (
    <View style={styles.list}>
      {tasks.map(task => (
        <View key={task.key} style={styles.taskItem}>
          <Checkbox
            value={task.completed}
            onValueChange={() => onToggle(task.key)}
            color={task.completed ? '#888' : undefined}
          />
          <Text
            style={[
              styles.taskText,
              task.completed && { textDecorationLine: 'line-through', color: '#888' }
            ]}
          >
            {task.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

