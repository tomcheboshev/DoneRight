<template>
    <div class="profile">
      <h2>Профил</h2>
      <div v-if="user">
        <p><strong>Име:</strong> {{ user.displayName || "Непознато" }}</p>
        <p><strong>Е-пошта:</strong> {{ user.email }}</p>
        <p><strong>UID:</strong> {{ user.uid }}</p>
        <button @click="logout" class="logout-btn">Одјави се</button>
      </div>
      <div v-else>
        <p>Не сте најавени.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  
  const user = ref(null)
  const router = useRouter()
  
  onMounted(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser
      }
    })
  })
  
  const logout = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
      user.value = null
      router.push('/') 
    } catch (error) {
      console.error("Logout error:", error)
    }
  }
  </script>
  
  <style scoped>
  .profile {
    max-width: 500px;
    margin: 40px auto;
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  h2 {
    margin-bottom: 20px;
  }
  .logout-btn {
    margin-top: 20px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  .logout-btn:hover {
    background-color: #e60000;
  }
  </style>
  