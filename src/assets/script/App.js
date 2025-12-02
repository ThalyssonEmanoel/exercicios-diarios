import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import { useTaskStore } from '../../stores/taskStore'
import AuthModal from '../../components/AuthModal.vue'

export default {
  components: { AuthModal },
  setup() {
    const taskStore = useTaskStore()
    const session = ref(null)

    const newTask = ref({
      nome: '',
      tempo_medio: '',
      data_treino: '',
      descricao: ''
    })

    const editingId = ref(null)
    const editingForm = ref({
      nome: '',
      tempo_medio: '',
      data_treino: '',
      descricao: ''
    })

    onMounted(() => {
      supabase.auth.getSession().then(({ data }) => {
        session.value = data.session
        if (session.value) taskStore.fetchTasks()
      })

      supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session
        if (_session) taskStore.fetchTasks()
      })
    })

    const handleLogout = async () => {
      await supabase.auth.signOut()
    }

    async function handleAddTask() {
      if (!newTask.value.nome || !newTask.value.data_treino) {
        alert('Nome e Data do Treino são obrigatórios!')
        return
      }
      
      await taskStore.addTask({
        ...newTask.value,
        tempo_medio: newTask.value.tempo_medio ? parseInt(newTask.value.tempo_medio) : null
      })
      
      newTask.value = {
        nome: '',
        tempo_medio: '',
        data_treino: '',
        descricao: ''
      }
    }

    function startEditing(task) {
      editingId.value = task.id
      editingForm.value = {
        nome: task.nome,
        tempo_medio: task.tempo_medio,
        data_treino: task.data_treino,
        descricao: task.descricao
      }
    }

    async function saveEdit(id) {
      await taskStore.editTask(id, {
        ...editingForm.value,
        tempo_medio: editingForm.value.tempo_medio ? parseInt(editingForm.value.tempo_medio) : null
      })
      editingId.value = null
    }

    function cancelEdit() {
      editingId.value = null
    }

    function formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    return {
      taskStore,
      session,
      newTask,
      editingId,
      editingForm,
      handleLogout,
      handleAddTask,
      startEditing,
      saveEdit,
      cancelEdit,
      formatDate
    }
  }
}
