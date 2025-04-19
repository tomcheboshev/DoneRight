<template>
  <v-container class="profile-wrapper fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="profile-card" elevation="10">
          <v-card-title class="justify-center">
            <h2 class="text-yellow text-h5 font-weight-bold">👤 Профил на корисник</h2>
          </v-card-title>

          <v-divider class="mb-4" />

          <v-card-text class="text-center" v-if="user">
            <v-avatar size="120" class="mx-auto mb-4">
              <v-img :src="user.profilePicture || defaultImage" cover />
            </v-avatar>

            <div class="mb-2">
              <strong class="text-yellow">Име:</strong> {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="mb-2">
              <strong class="text-yellow">Е-пошта:</strong> {{ user.email }}
            </div>
            <div class="mb-2">
              <strong class="text-yellow">Град:</strong> {{ user.city }}
            </div>
            <div class="mb-2">
              <strong class="text-yellow">Телефон:</strong> {{ user.phone }}
            </div>

            <v-row justify="center" class="mt-6">
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="yellow-darken-2"
                  class="text-black font-weight-bold"
                  @click="goToEditProfile"
                >
                  ✏️ Aжурирај
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="red-darken-1"
                  class="text-white font-weight-bold"
                  @click="logout"
                >
                  🔒 Одјави се
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="text-center" v-else>
            <v-icon size="48" color="grey-lighten-1">mdi-account-off</v-icon>
            <p class="text-grey-lighten-1 mt-2">Не сте најавени.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from '@/firebase'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const user = ref(null)
const defaultImage = new URL('@/assets/lok.png', import.meta.url).href

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid))
        const snapshot = await getDocs(userQuery)

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data()

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
  background: linear-gradient(135deg, #121212, #1a1a1a);
  padding-top: 100px;
  padding-bottom: 80px;
}

.profile-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  color: white;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.6s ease-in-out;
}

.text-yellow {
  color: #ffc107;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
