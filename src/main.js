import React, { component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return ({
      tasks: ['Clean Bathroom', 'Vacuum', 'Take Out Trash'],
      task: ''
    })
  },

  renderList(tasks) {
    // TODO: render individual rows with the states tasks
    return (
      tasks.map((task) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
          </View>
        )
      })
    )
  },

  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks: tasks})
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
            console.log(this.state.task);
          }}
          onEndEditing={()=>this.addTask()}
        />
        {this.renderList(this.state.tasks)}
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
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
