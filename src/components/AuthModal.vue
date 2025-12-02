<script src="../assets/script/AuthModal.js"></script>

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

      <button @click="handleGithubLogin" class="github-btn">
        Continuar com GitHub
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

<style scoped src="../assets/css/AuthModal.css"></style>