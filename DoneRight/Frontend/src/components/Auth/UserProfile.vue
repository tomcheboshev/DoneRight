<template>
  <div class="profile-wrapper">
    <div class="profile-card">
      <h2>Профил на корисник</h2>

      <div v-if="user" class="info">
        <img :src="user.profilePicture || defaultImage" alt="Profile Picture" class="profile-image" />
        <p><span>Име:</span> {{ user.firstName }} {{ user.lastName }}</p>
        <p><span>Е-пошта:</span> {{ user.email }}</p>
        <p><span>Град:</span> {{ user.city }}</p>
        <p><span>Телефонски број:</span> {{ user.phone }}</p>
        <div class="button-group">
          <button @click="goToEditProfile" class="edit-btn">Aжурирај</button>
          <button @click="logout" class="logout-btn">Одјави се</button>
        </div>
      </div>

      <div v-else class="info">
        <p>Не сте најавени.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from '@/firebase'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'

const user = ref(null)
const router = useRouter()
const defaultImage = new URL('@/assets/lok.png', import.meta.url).href

onMounted(() => {
  const auth = getAuth()

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        // Fetch user info
        const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid))
        const snapshot = await getDocs(userQuery)

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data()

          // Fetch profile picture from userProfilePictures collection
          const profilePicRef = doc(db, 'userProfilePictures', currentUser.uid)
          const profilePicSnap = await getDoc(profilePicRef)

          let profilePicture = ''
          if (profilePicSnap.exists()) {
            const profileData = profilePicSnap.data()
            profilePicture = profileData.profilePicture || ''
          }

          user.value = {
            ...userData,
            email: currentUser.email,
            profilePicture
          }
        } else {
          console.warn('User not found in Firestore.')
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
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
    console.error('Logout error:', error)
  }
}

const goToEditProfile = () => {
  router.push('/edit')
}

</script>

<style scoped>
.profile-wrapper {
  background-color: #212529;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 30px 40px;
  width: 100%;
  max-width: 500px;
  color: #fff;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid #ffc107;
}

h2 {
  font-size: 24px;
  color: #ffc107;
  margin-bottom: 25px;
}

.info p {
  margin: 12px 0;
  font-size: 16px;
}

.info span {
  font-weight: bold;
  color: #ffc107;
}

.button-group {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
}

.edit-btn {
  margin-top: 15px;
  background-color: #ffc107;
  color: #212529;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #e6b800;
}

.logout-btn {
  margin-top: 25px;
  background-color: #ff4d4d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #e60000;
}
</style>
