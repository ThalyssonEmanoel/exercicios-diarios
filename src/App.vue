<script setup>
import { ref } from 'vue'
import { useTaskStore } from './stores/taskStore'

const taskStore = useTaskStore()
const newTask = ref('')
const editingId = ref(null)
const editingText = ref('')

function handleAddTask() {
  taskStore.addTask(newTask.value)
  newTask.value = ''
}

function startEditing(task) {
  editingId.value = task.id
  editingText.value = task.text
}

function saveEdit(id) {
  taskStore.editTask(id, editingText.value)
  editingId.value = null
  editingText.value = ''
}

function cancelEdit() {
  editingId.value = null
  editingText.value = ''
}
</script>

<template>
  <div class="container">
    <div class="add-task">
      <input 
        v-model="newTask" 
        @keyup.enter="handleAddTask"
        type="text" 
        placeholder="Digite uma nova tarefa..."
        class="task-input"
      />
      <button @click="handleAddTask" class="add-button">ADICIONAR</button>
    </div>

    <div class="task-list">
      <div 
        v-for="task in taskStore.tasks" 
        :key="task.id" 
        class="task-card"
      >
        <input 
          type="checkbox" 
          :checked="task.completed"
          @change="taskStore.toggleTask(task.id)"
          class="task-checkbox"
        />
        
        <div 
          v-if="editingId !== task.id"
          @click="startEditing(task)"
          class="task-text"
          :class="{ completed: task.completed }"
        >
          {{ task.text }}
        </div>
        
        <input 
          v-else
          v-model="editingText"
          @keyup.enter="saveEdit(task.id)"
          @keyup.esc="cancelEdit"
          @blur="saveEdit(task.id)"
          class="task-edit-input"
          autofocus
        />
        
        <button 
          @click="taskStore.deleteTask(task.id)"
          class="delete-button"
        >
          excluir
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  padding: 40px 20px;
}

.add-task {
  max-width: 800px;
  margin: 0 auto 30px;
  display: flex;
  gap: 10px;
}

.task-input {
  flex: 1;
  padding: 15px 20px;
  background-color: #2a2d3a;
  border: 1px solid #3a3d4a;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  outline: none;
}

.task-input::placeholder {
  color: #6a6d7a;
}

.task-input:focus {
  border-color: #4a9d5f;
}

.add-button {
  padding: 15px 30px;
  background-color: #4a9d5f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #3d8a4f;
}

.task-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  background-color: #c5c5c5;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateX(5px);
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #4a9d5f;
}

.task-text {
  flex: 1;
  color: #1a1d29;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.task-text.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-edit-input {
  flex: 1;
  padding: 8px 12px;
  background-color: white;
  border: 2px solid #4a9d5f;
  border-radius: 4px;
  color: #1a1d29;
  font-size: 16px;
  outline: none;
}

.delete-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  transition: transform 0.2s;
}

.delete-button:hover {
  transform: scale(1.2);
}
</style>
