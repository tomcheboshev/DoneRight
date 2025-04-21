<template>
  <v-container class="profile-wrapper" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="profile-card" elevation="10">
          <v-card-text class="profile-content">
            <div class="avatar-section">
              <v-avatar size="120">
                <v-img :src="user?.profilePicture || defaultImage" cover />
              </v-avatar>
              <h2 class="username" v-if="user">{{ user.firstName }} {{ user.lastName }}</h2>
              <p class="user-subtitle" v-if="user">{{ user.email }}</p>
            </div>

            <v-divider class="my-6" />

            <v-row dense>
              <v-col cols="12" sm="6">
                <p class="info-label">Град</p>
                <p class="info-value">{{ user?.city || '—' }}</p>
              </v-col>
              <v-col cols="12" sm="6">
                <p class="info-label">Телефон</p>
                <p class="info-value">{{ user?.phone || '—' }}</p>
              </v-col>
            </v-row>

            <v-row class="mt-6" dense>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="yellow-darken-2"
                  class="text-black font-weight-bold"
                  @click="goToEditProfile"
                >
                  Ажурирај
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="red-darken-2"
                  class="text-white font-weight-bold"
                  @click="logout"
                >
                  Одјави се
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="text-center" v-if="!user">
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
  background: linear-gradient(to bottom right, #0e0e0e, #1a1a1a);
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  backdrop-filter: blur(18px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 44px rgba(255, 193, 7, 0.15);
}

.profile-content {
  padding: 48px 36px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 28px;
}

.v-avatar {
  border: 3px solid #ffc107;
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.2);
  transition: transform 0.4s ease;
}

.v-avatar:hover {
  transform: scale(1.07);
}

.username {
  font-size: 2rem;
  font-weight: 700;
  color: #ffc107;
  margin-top: 16px;
  text-shadow: 0 0 6px rgba(255, 193, 7, 0.25);
}

.user-subtitle {
  font-size: 1rem;
  color: #ccc;
  margin-top: 4px;
  font-weight: 400;
}

.v-divider {
  margin: 32px 0;
  opacity: 0.08;
  border-color: #ffc107;
}

.info-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.info-value {
  font-size: 1.05rem;
  font-weight: 500;
  color: #f1f1f1;
  margin-bottom: 20px;
}

.v-btn {
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  padding: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.v-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 22px rgba(255, 193, 7, 0.25);
}

@media (max-width: 768px) {
  .profile-content {
    padding: 32px 20px;
  }

  .username {
    font-size: 1.6rem;
  }

  .user-subtitle {
    font-size: 0.95rem;
  }

  .info-value {
    font-size: 1rem;
  }

  .v-btn {
    font-size: 0.9rem;
    padding: 12px;
  }
}
</style>
