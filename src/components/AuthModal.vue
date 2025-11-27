<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const password = ref('')
const isSignUp = ref(false) // Alterna entre Login e Cadastro
const errorMessage = ref('')

const handleAuth = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    if (isSignUp.value) {
      // Fluxo de Cadastro
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      alert('Cadastro realizado! Verifique seu email para confirmar.')
    } else {
      // Fluxo de Login
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
    }
  } catch (error) {
    errorMessage.value = error.message || 'Ocorreu um erro na autenticação'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) throw error
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="auth-overlay">
    <div class="auth-modal">
      <h2>{{ isSignUp ? 'Criar Conta' : 'Acessar Conta' }}</h2>
      
      <div class="form-group">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Seu email" 
          class="auth-input"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Sua senha" 
          class="auth-input"
          @keyup.enter="handleAuth"
        />
      </div>

      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

      <button :disabled="loading" @click="handleAuth" class="primary-btn">
        {{ loading ? 'Carregando...' : (isSignUp ? 'Cadastrar' : 'Entrar') }}
      </button>

      <div class="divider">ou</div>

      <button @click="handleGoogleLogin" class="google-btn">
        Continuar com Google
      </button>

      <p class="toggle-text">
        {{ isSignUp ? 'Já tem uma conta?' : 'Não tem conta?' }}
        <span @click="isSignUp = !isSignUp">
          {{ isSignUp ? 'Fazer Login' : 'Criar conta' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.auth-modal {
  background: #050505ff;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.auth-input {
  padding: 12px;
  background: #1a1d29;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  outline: none;
}

.auth-input:focus { border-color: #4a9d5f; }

.primary-btn, .google-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: opacity 0.2s;
}

.primary-btn {
  background-color: #4a9d5f;
  color: white;
}

.google-btn {
  background-color: white;
  color: #333;
  margin-top: 10px;
}

.primary-btn:hover, .google-btn:hover { opacity: 0.9; }

.divider { margin: 15px 0; color: white; font-size: 0.9rem; }

.toggle-text {
  margin-top: 20px;
  font-size: 0.9rem;
  color: white;
  margin-right: 20px;
}

.toggle-text span {
  color: #4a9d5f;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 50px;
}

.error-msg {
  color: #ff6b6b;
  margin-bottom: 15px;
  font-size: 0.9rem;
}
</style>