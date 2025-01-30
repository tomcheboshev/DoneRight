<script setup>
import { RouterLink } from 'vue-router';

</script>


  <!-- <h1>Login</h1>
  <input type="text" placeholder="email">
  <input type="text" placeholder="password">
  <RouterLink to="/register"><a href="">Forgotpass</a></RouterLink> -->
  <!-- <RouterLink to="/register"><a rel="noopener noreferrer" href="#">Forgot Password ?</a></RouterLink> -->


  <template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="auth-button">Login</button>
      </form>
      <p class="auth-link">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Add your login logic here
      console.log("Logging in with:", this.email, this.password);
    },
  },
};
</script>

<style scoped src="@/assets/auth.css"></style>