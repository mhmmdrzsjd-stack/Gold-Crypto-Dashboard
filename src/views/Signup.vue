
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const success = ref(false)

const emailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const passwordValid = computed(() => {
  return form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /\d/.test(form.password)
})

const passwordsMatch = computed(() => {
  return form.password === form.confirmPassword &&
    form.confirmPassword.length > 0
})

function register() {
  error.value = ''

  if (!form.name.trim() || !form.email.trim() ||
      !form.password || !form.confirmPassword) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (!emailValid.value) {
    error.value = 'Please enter a valid email.'
    return
  }

  if (!passwordValid.value) {
    error.value = 'Password must have at least 8 characters, uppercase, lowercase and a number.'
    return
  }

  if (!passwordsMatch.value) {
    error.value = 'Passwords do not match.'
    return
  }

  if (!form.terms) {
    error.value = 'Please accept the terms and conditions.'
    return
  }

  loading.value = true

  try {
    const users = JSON.parse(
      localStorage.getItem('goldcrypto_users') || '[]'
    )

    const exists = users.some(
      (user: { email: string }) =>
        user.email === form.email.trim().toLowerCase()
    )

    if (exists) {
      error.value = 'This email is already registered.'
      return
    }

    const newUser = {
      id: Date.now().toString(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    }

    users.push(newUser)

    localStorage.setItem(
      'goldcrypto_users',
      JSON.stringify(users)
    )

    localStorage.setItem(
      'goldcrypto_current_user',
      JSON.stringify(newUser)
    )

    success.value = true
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="signup-page">

    <section class="signup-card">

      <div class="signup-logo">
        <span>₿</span>
        <h2>GoldCrypto</h2>
      </div>

      <div v-if="!success">

        <div class="signup-heading">
          <span>WELCOME TO GOLDCRYPTO</span>
          <h1>Create Account</h1>
          <p>Create your account and explore the market.</p>
        </div>

        <form @submit.prevent="register">

          <div class="signup-field">
            <label>Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your full name"
              autocomplete="name"
            />
          </div>

          <div class="signup-field">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
            />
            <small v-if="form.email && !emailValid">
              Please enter a valid email.
            </small>
          </div>

          <div class="signup-field">
            <label>Password</label>

            <div class="password-wrapper">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                autocomplete="new-password"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>

            <small>
              At least 8 characters, uppercase, lowercase and a number.
            </small>
          </div>

          <div class="signup-field">
            <label>Confirm Password</label>

            <div class="password-wrapper">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                autocomplete="new-password"
              />

              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>

            <small v-if="form.confirmPassword && !passwordsMatch">
              Passwords do not match.
            </small>

            <small v-else-if="passwordsMatch" class="match-message">
              Passwords match.
            </small>
          </div>

          <label class="terms">
            <input v-model="form.terms" type="checkbox" />
            <span>I agree to the Terms and Conditions.</span>
          </label>

          <p v-if="error" class="error-message">
            {{ error }}
          </p>

          <button
            type="submit"
            class="signup-button"
            :disabled="loading"
          >
            {{ loading ? 'Creating Account...' : 'Create Account' }}
            <span>→</span>
          </button>

        </form>

        <div class="signup-bottom">
          Already have an account?
          <RouterLink to="/login">Sign In</RouterLink>
        </div>

      </div>

      <div v-else class="success-box">
        <div class="success-icon">✓</div>
        <h1>Account Created!</h1>
        <p>Welcome to GoldCrypto, {{ form.name }}.</p>
        <p>{{ form.email }}</p>

        <button
          class="signup-button"
          @click="router.push('/')"
        >
          Go to Dashboard →
        </button>
      </div>

    </section>

    <section class="signup-side">

      <div class="side-top">
        <h3>GoldCrypto</h3>
        <span>MARKET PLATFORM</span>
      </div>

      <div class="side-content">
        <span class="side-label">YOUR FINANCIAL JOURNEY</span>

        <h1>
          Manage Your
          <strong>Digital Assets.</strong>
        </h1>

        <p>
          Explore cryptocurrency markets, follow gold prices
          and manage your assets in one simple platform.
        </p>

        <div class="asset-list">

          <div class="asset-item">
            <div class="coin bitcoin">₿</div>
            <div>
              <h4>Bitcoin</h4>
              <span>BTC</span>
            </div>
          </div>

          <div class="asset-item">
            <div class="coin ethereum">Ξ</div>
            <div>
              <h4>Ethereum</h4>
              <span>ETH</span>
            </div>
          </div>

          <div class="asset-item">
            <div class="coin gold">Au</div>
            <div>
              <h4>Gold</h4>
              <span>XAU</span>
            </div>
          </div>

        </div>
      </div>

      <div class="side-footer">
        GOLDCRYPTO DASHBOARD
      </div>

    </section>

  </main>
</template>
