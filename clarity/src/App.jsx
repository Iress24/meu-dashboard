import { useState, useEffect } from "react";

function App() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("4");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("clarity_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("clarity_tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
      deadline,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskText("");
    setDeadline("");
    setPriority("4");
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleClearAll() {
    setTasks([]);
  }

  const groupedTasks = {
    4: tasks.filter((t) => t.priority === "4"),
    3: tasks.filter((t) => t.priority === "3"),
    2: tasks.filter((t) => t.priority === "2"),
    1: tasks.filter((t) => t.priority === "1"),
  };

  return (
    <div className="container">
      <h1>Clarity</h1>
      <p className="subtitle">
        Organize o que realmente importa hoje.
      </p>

      <div className="form">
        <input
          type="text"
          placeholder="Digite sua tarefa..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="4">Prioridade 4 - Urgente</option>
          <option value="3">Prioridade 3</option>
          <option value="2">Prioridade 2</option>
          <option value="1">Prioridade 1 - Baixa</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button onClick={handleAddTask}>
          Adicionar
        </button>
      </div>

      {["4", "3", "2", "1"].map((level) => (
        <div key={level} className="priority-block">
          <h2>Prioridade {level}</h2>

          {groupedTasks[level].map((task) => (
            <div
              key={task.id}
              className={`task ${task.completed ? "done" : ""}`}
            >
              <div onClick={() => handleToggle(task.id)}>
                <strong>{task.text}</strong>
                {task.deadline && (
                  <p className="deadline">
                    Prazo: {task.deadline}
                  </p>
                )}
              </div>

              <button onClick={() => handleDelete(task.id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      ))}

      {tasks.length > 0 && (
        <button className="clear" onClick={handleClearAll}>
          Limpar tudo
        </button>
      )}
    </div>
  );
}

export default App;