import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  // Функция для добавления задачи
  const addTask = () => {
    if (newTask.length <= 50) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Функция для переключения статуса задачи
  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Счётчик выполненных и невыполненных задач
  const completedCount = tasks.filter(task => task.completed).length;
  const incompleteCount = tasks.length - completedCount;

  return (
    <div className="container">
      <h1>Список задач</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Введите задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addTask}>Добавить задачу</button>
      </div>

      <div className="mt-3">
        <button className="btn btn-info mr-2" onClick={() => setFilter('all')}>Все</button>
        <button className="btn btn-success mr-2" onClick={() => setFilter('completed')}>Выполненные</button>
        <button className="btn btn-warning" onClick={() => setFilter('incomplete')}>Невыполненные</button>
      </div>

      <h4>Выполненные: {completedCount} | Невыполненные: {incompleteCount}</h4>

      <ul className="list-group mt-3">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item ${task.completed ? 'list-group-item-success' : 'list-group-item-danger'}`}
            onClick={() => toggleStatus(index)}
            style={{ cursor: 'pointer' }}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
