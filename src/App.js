/** @format */

import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import Form from './components/Form';
import AddingTasks from './pages/AddingTasks';
import ChangingStatus from './pages/ChangingStatus';
import RemovingTasks from './pages/RemovingTasks';
import { v4 as uuid } from 'uuid';
import TaskCounter from './components/Tasks/TaskCounter';
import { Routes, Route } from 'react-router-dom';
import Help from './pages/Help';
// import styles from './styles/styles.module.scss';

function App() {
  // List of hardcoded tasks.
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      title: 'Change Jeep oil',
      status: 'Open',
    },
    {
      id: uuid(),
      title: 'Clean the kitchen',
      status: 'Open',
    },
    {
      id: uuid(),
      title: 'Rake the leaves',
      status: 'Open',
    },
    {
      id: uuid(),
      title: 'Cut down that dead tree',
      status: 'Open',
    },
    {
      id: uuid(),
      title: 'Clean the litter box',
      status: 'Open',
    },
    {
      id: uuid(),
      title: 'Do laundry',
      status: 'Open',
    },
  ]);

  const statusList = [
    {
      status: 'Please select an option',
      value: null,
    },
    {
      status: 'Open',
      value: false,
    },
    {
      status: 'Completed',
      value: true,
    },
  ];

  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);

  /**
   * Handler function for verifying user had entered required information.
   * - Description is required.
   * - Status is required.
   */
  const addTask = (e) => {
    const validate = [];
    e.preventDefault();
    // Checks for description variable string length, if length is 0, then it pushes the message to the validate array.
    if (description.length === 0) {
      validate.push('Please enter a description.');
    }
    // Checks for selected status variable string contents, if string is empty, it pushes the message to the validate array.
    if (selectedValue !== 'true' && selectedValue !== 'false') {
      validate.push('Please select a status.');
    }
    // Checks for the length of the validate array, if array length is greater than 0, it sets the error messages to the error message array.
    if (validate.length > 0) {
      setErrorMessage(validate);
    } else {
      // If there are no errors to display, it sets the error message array to a blank array to clear the previous error messages.
      setErrorMessage([]);

      let currentStatus;
      // Uses boolean values to determine whether the currentStatus should be set to 'Open' or 'Completed'.
      if (selectedValue === 'false') {
        currentStatus = 'Open';
      } else if (selectedValue === 'true') {
        currentStatus = 'Completed';
      }

      // If all checks are passed, tasks array is updated with the new task.
      setTasks([
        ...tasks,
        {
          id: uuid(),
          title: description,
          status: currentStatus,
        },
      ]);
      // Description and status values are both set to empty strings again to re-enable checks for the next task that's added.
      setDescription('');
      setSelectedValue(statusList[0]);
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Tasks
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path='add-task'
          element={
            <Form
              description={description}
              setDescription={setDescription}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
              statusList={statusList}
              addTask={addTask}
              errorMessage={errorMessage}
            />
          }
        />
        <Route
          path='task-counter'
          element={<TaskCounter tasks={tasks} />}
        />

        <Route
          path='help'
          element={<Help />}
        >
          <Route
            path='adding-tasks'
            element={<AddingTasks />}
          />
          <Route
            path='changing-status'
            element={<ChangingStatus />}
          />
          <Route
            path='removing-tasks'
            element={<RemovingTasks />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
