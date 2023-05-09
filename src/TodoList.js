import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function TodoList() {
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask !== '') {
      setTasks([...tasks, {text: currentTask, completed: false}]);
      setCurrentTask('');
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleCheck = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
  };
  
  const handleEdit = (index) => {
    setEditingTask(index);
    setCurrentTask(tasks[index].text);
  };

  const handleSave = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      text: currentTask,
    };
    setTasks(newTasks);
    setEditingTask(null);
    setCurrentTask('');
  };

  const handleCancel = () => {
    setEditingTask(null);
    setCurrentTask('');
  };

  return (
    <Container maxWidth="sm">
      <Typography className='Title' variant="h4" align="center" gutterBottom>
        <b>TODO List</b>
      </Typography>
      <form className='form' onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add task..."
          value={currentTask}
          onChange={(event) => setCurrentTask(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          {editingTask === null ? 'Add' : 'Save'}
        </Button>
      </form>
      <List className='list' disablePadding>
        {tasks.map((task, index) => (
          <ListItem id='listitem' key={index} dense button>
            <Checkbox
              checked={task.completed}
              onChange={() => handleCheck(index)}
              disableRipple
            />
            {editingTask === index ? (
              <TextField
                fullWidth
                variant="outlined"
                value={currentTask}
                onChange={(event) => setCurrentTask(event.target.value)}
              />
            ) : (
              <ListItemText
                primary={task.text}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
            )}
            <ListItemSecondaryAction>
              {editingTask === index ? (
                <>
                  <IconButton onClick={handleCancel}>Cancel</IconButton>
                  <IconButton onClick={() => handleSave(index)}>Save</IconButton>
                </>
              ) : (
                <IconButton edge="end" onClick={() => handleEdit(index)}>
                  <EditIcon/>
                </IconButton>
              )}
              <IconButton edge="end" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>

          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TodoList;
