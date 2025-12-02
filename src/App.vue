<script src="./assets/script/App.js"></script>

<template>
  <AuthModal v-if="!session" />

  <div v-else class="container">
    <div class="header">
      <h1>Meus Treinos</h1>
      <button @click="handleLogout" class="logout-btn">Sair</button>
    </div>

    <div class="add-task-form">
      <div class="form-row">
        <input 
          v-model="newTask.nome" 
          type="text" 
          placeholder="Nome do treino" 
          class="task-input"
        />
        <input 
          v-model="newTask.tempo_medio" 
          type="number" 
          placeholder="Tempo (min)" 
          class="task-input small-input"
        />
      </div>
      <div class="form-row">
        <input 
          v-model="newTask.data_treino" 
          type="date" 
          class="task-input"
        />
        <input 
          v-model="newTask.descricao" 
          type="text" 
          placeholder="Descrição (opcional)" 
          class="task-input"
        />
      </div>
      <button @click="handleAddTask" class="add-button">ADICIONAR TREINO</button>
    </div>

    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task.id" class="task-card">
        <div v-if="editingId !== task.id" class="task-content">
          <div class="task-header">
            <div class="checkbox-wrapper">
              <input 
                type="checkbox" 
                :checked="task.status === 'concluido'"
                @change="taskStore.toggleTask(task.id, task.status)"
                class="task-checkbox"
              />
            </div>
            <div class="task-info">
              <h3 :class="{ completed: task.status === 'concluido' }">{{ task.nome }}</h3>
              <span class="task-meta">
                {{ formatDate(task.data_treino) }} 
                <span v-if="task.tempo_medio">• {{ task.tempo_medio }} min</span>
              </span>
              <p v-if="task.descricao" class="task-desc">{{ task.descricao }}</p>
            </div>
          </div>

          <div class="task-actions">
            <button @click="startEditing(task)" class="icon-btn edit" title="Editar">Editar</button>
            <button @click="taskStore.deleteTask(task.id)" class="icon-btn delete" title="Excluir">Excluir</button>
          </div>
        </div>

        <div v-else class="edit-form">
          <div class="form-row">
            <input v-model="editingForm.nome" placeholder="Nome" class="edit-input" />
            <input v-model="editingForm.tempo_medio" type="number" placeholder="Min" class="edit-input small-input" />
          </div>
          <div class="form-row">
            <input v-model="editingForm.data_treino" type="date" class="edit-input" />
            <input v-model="editingForm.descricao" placeholder="Descrição" class="edit-input" />
          </div>
          <div class="edit-actions">
            <button @click="saveEdit(task.id)" class="save-btn">Salvar</button>
            <button @click="cancelEdit" class="cancel-btn">Cancelar</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped src="./assets/css/App.css"></style>