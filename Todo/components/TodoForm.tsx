import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Todo, Task } from '../types/types';

type TodoFormProps = {
  onAdd: (todo: Todo) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]); // Update the initial state
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    const createDate = now.toISOString();
    const status = false;
    const id = now.getTime();
    onAdd({ id, deadline, tasks, title, status, createDate }); // Update the property name to "tasks"
    setDeadline('');
    setTasks([]); // Update the initial state
    setTitle('');
  };

  const handleAddTask = () => {
    setTasks([...tasks, { task: '', checked: false }]); // Update the variable name to "tasks"
  };
  const handleRemoveTask = (taskIndex: number) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
  <Form.Label>Task</Form.Label>
  {tasks.map((t, index) => (
    <div key={index}>
      <Row>
        <Col xs={8}>
          <Form.Control
            as="textarea"
            placeholder="Enter Task"
            value={t.task}
            onChange={(e) => {
              const newTasks = [...tasks];
              newTasks[index] = { ...t, task: e.target.value };
              setTasks(newTasks);
            }}
            required
          />
        </Col>
        <Col xs={4}>
          <Button variant="danger" onClick={() => handleRemoveTask(index)} className="mt-2">
            Remove
          </Button>
        </Col>
      </Row>
    </div>
  ))}
  <Button variant="primary" onClick={handleAddTask} className="mt-2">
    Add Task
  </Button>
</Form.Group>



        
      </Row>

      <Button variant="primary" type="submit">
        New Task
      </Button>
    </Form>
  );
}
