import React, { component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return ({
      tasks: [],
      completedTasks: [],
      task: ''
    })
  },

  componentWillMount() {
    AsyncStorage.getItem('tasks')
      .then((response) => {
        this.setState({tasks: JSON.parse(response)})
      });
    AsyncStorage.getItem('completedTasks')
      .then((response) => {
        this.setState({completedTasks: JSON.parse(response)})
      });
  },

  // Save states on all updates
  componentDidUpdate() {
    this.setStorage();
  },

  setStorage() {
    // Save task list
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    // Save completedTasks list
    AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
  },

  renderList(tasks) {
    return (
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.completeTask(index)}
            >
              <Text>
                &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  renderCompleted(tasks) {
    return (
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text style={styles.completed}>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.deleteTask(index)}
            >
              <Text>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  deleteTask(index) {
    let completedTasks = this.state.completedTasks
    completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index+1));
    // Updates component state to reflect removed task
    this.setState({completedTasks});
  },

  completeTask(index) {
    // Removes task from tasks list
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
    // Adds task to completedTasks list
    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.concat([this.state.tasks[index]]);
    // Updates component states to reflect list changes
    this.setState({
      tasks,
      completedTasks
    });
  },

  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    // Update component state to reflect added task
    this.setState({tasks: tasks});
    // TODO Remove text from input
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          To-Do Master
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Add a task...'
          onChangeText={(text) => {
            this.setState({task: text});
          }}
          onEndEditing={()=>this.addTask()}
        />
        <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.renderCompleted(this.state.completedTasks)}
        </ScrollView>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    margin: 30,
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },

  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10
  },

  task: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },

  completed: {
    color: '#555',
    textDecorationLine: 'line-through'
  }
});
