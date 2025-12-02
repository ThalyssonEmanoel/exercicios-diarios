import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('treino')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar treinos:', error)
      return
    }
    
    tasks.value = data
  }

  async function addTask(treino) {
    const { data, error } = await supabase
      .from('treino')
      .insert([
        {
          nome: treino.nome,
          tempo_medio: treino.tempo_medio,
          data_treino: treino.data_treino,
          descricao: treino.descricao,
          status: treino.status || 'pendente',
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      ])
      .select()

    if (error) {
      console.error('Erro ao adicionar treino:', error)
      return
    }

    if (data) {
      tasks.value.unshift(data[0])
    }
  }

  async function toggleTask(id, currentStatus) {
    const newStatus = currentStatus === 'pendente' ? 'concluido' : 'pendente'
    const { data, error } = await supabase
      .from('treino')
      .update({ status: newStatus })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Erro ao atualizar status:', error)
      return
    }

    if (data) {
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = data[0]
      }
    }
  }

  async function editTask(id, updates) {
    const { data, error } = await supabase
      .from('treino')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Erro ao editar treino:', error)
      return
    }

    if (data) {
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = data[0]
      }
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase
      .from('treino')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao deletar treino:', error)
      return
    }

    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask
  }
})
