import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  let nextId = 1

  function addTask(text) {
    if (text.trim()) {
      tasks.value.push({
        id: nextId++,
        text: text.trim(),
        completed: false
      })
    }
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  function editTask(id, newText) {
    const task = tasks.value.find(t => t.id === id)
    if (task && newText.trim()) {
      task.text = newText.trim()
    }
  }

  function deleteTask(id) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  return {
    tasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask
  }
})
