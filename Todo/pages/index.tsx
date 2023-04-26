// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { Task, Todo } from '../types/types';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { formatDeadline } from '../utils/format';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage when todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTaskCheck = (todoId: number, index: number, checked: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTasks = [...todo.tasks];
        updatedTasks[index].checked = checked;
        return { ...todo, tasks: updatedTasks };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.deadline.startsWith(search)
  );
  const renderTaskCheckboxes = (todo: Todo) => {
  return todo.tasks.map((taskObj, index) => (
    <div key={index}>
      <Form.Check
        type="checkbox"
        label={taskObj.task}
        checked={taskObj.checked}
        className="mb-1"
        onChange={(e) => {
          if (todo.onTaskCheck) {
            todo.onTaskCheck(index, e.target.checked);
          }
        }}
      />
    </div>
  ));
};


  return (
    <div>
      <Head>
        <title>TaskMaster</title>
      </Head>
      <header>
        {/* ... */}
      </header>
      <main>
        <Container className="my-4">
          <Row>
            <Col md={6} lg={4}>
              <h2>TaskMaster</h2>
              <TodoForm onAdd={handleAdd} />
            </Col>
            <Col md={6} lg={8}>
              <Form.Group>
                <Form.Label>Search by Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search by deadline"
                />
              </Form.Group>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo) => (
                    <tr key={todo.id}>
                    <td>{todo.title}
                    {renderTaskCheckboxes({ ...todo, onTaskCheck: (index, checked) => handleTaskCheck(todo.id, index, checked) })}
</td>
                      <td>{formatDeadline(todo.deadline)}</td>
                      <td>{todo.status ? 'Completed' : 'Open'}</td>
                      <td>
                        <TodoItem
                          todo={todo}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
