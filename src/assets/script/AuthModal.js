import { ref } from 'vue'
import { supabase } from '../../supabase'

export default {
  setup() {
    const loading = ref(false)
    const email = ref('')
    const password = ref('')
    const isSignUp = ref(false) 
    const errorMessage = ref('')

    const handleAuth = async () => {
      try {
        loading.value = true
        errorMessage.value = ''
        
        if (isSignUp.value) {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          })
          if (error) throw error
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

    return {
      loading,
      email,
      password,
      isSignUp,
      errorMessage,
      handleAuth,
      handleGoogleLogin
    }
  }
}
