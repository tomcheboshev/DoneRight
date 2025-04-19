<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase'

const router = useRouter()
const services = ref([])
const favorites = ref([])
const isLoading = ref(true)
const searchService = ref('')
const searchCity = ref('')
const currentPage = ref(1)
const itemsPerPage = 8
const userDocId = ref(null)

const allServices = [
  'Електричар', 'Водоводџија', 'Молер', 'Механичар', 'Дрводелец', 'Техничар',
  'Инженер', 'Монтер', 'Чистач'
]

const cities = [
  'Скопје', 'Битола', 'Тетово', 'Куманово', 'Прилеп', 'Охрид', 'Гостивар', 'Штип',
  'Кавадарци', 'Велес', 'Кочани', 'Струмица', 'Гевгелија', 'Кичево', 'Струга',
  'Неготино', 'Ресен', 'Кратово', 'Крива Паланка', 'Дебар', 'Берово', 'Делчево',
  'Виница', 'Пробиштип', 'Свети Николе', 'Богданци', 'Валандово', 'Демир Хисар',
  'Македонски Брод', 'Крушево', 'Пехчево', 'Радовиш'
]

const filteredServicesList = computed(() =>
  services.value.filter(s =>
    (!searchCity.value || s.location === searchCity.value) &&
    (!searchService.value || s.job.toLowerCase().includes(searchService.value.toLowerCase()))
  )
)

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredServicesList.value.slice(start, start + itemsPerPage)
})

const pageCount = computed(() =>
  Math.ceil(filteredServicesList.value.length / itemsPerPage)
)

const getJobIcon = (job) => {
  const icons = {
    'Електричар': '⚡',
    'Водоводџија': '🔧',
    'Дрводелец': '🪚',
    'Механичар': '🔩'
  }
  return icons[job] || '💼'
}

const toggleFavorite = async (service) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser || !userDocId.value) return

  const userRef = doc(db, 'users', userDocId.value)
  const currentFavorites = [...favorites.value]
  const index = currentFavorites.indexOf(service.id)

  if (index === -1) {
    currentFavorites.push(service.id)
    favorites.value.push(service.id)
  } else {
    currentFavorites.splice(index, 1)
    favorites.value = favorites.value.filter(id => id !== service.id)
  }

  await updateDoc(userRef, {
    favourites: currentFavorites
  })
}

const isFavorite = (service) => favorites.value.includes(service.id)

const goToDetails = (service) => {
  router.push({ path: `/service/${service.id}` })
}

const loadServices = async () => {
  isLoading.value = true
  try {
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (currentUser) {
      const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid))
      const userSnap = await getDocs(userQuery)

      if (!userSnap.empty) {
        const userDoc = userSnap.docs[0]
        userDocId.value = userDoc.id
        const userData = userDoc.data()
        favorites.value = userData.favourites || []
      }
    }

    const serviceSnapshot = await getDocs(collection(db, 'services'))
    const enriched = await Promise.all(serviceSnapshot.docs.map(async docSnap => {
      const data = docSnap.data()
      const uid = data.userId

      let firstName = 'Име'
      let lastName = ''
      let image = new URL('@/assets/lok.png', import.meta.url).href
      let location = 'Непознато'

      if (uid) {
        const q = query(collection(db, 'users'), where('uid', '==', uid))
        const userSnap = await getDocs(q)
        if (!userSnap.empty) {
          const user = userSnap.docs[0].data()
          firstName = user.firstName || firstName
          lastName = user.lastName || lastName
          image = user.image || image
          location = user.city || location
        }

        const picRef = doc(db, 'userProfilePictures', uid)
        const picSnap = await getDoc(picRef)
        if (picSnap.exists()) {
          const picData = picSnap.data()
          if (picData.profilePicture) image = picData.profilePicture
        }
      }

      return {
        id: docSnap.id,
        name: firstName,
        lastName,
        job: data.service || 'Услуга',
        image,
        location,
        rating: 5
      }
    }))

    services.value = enriched
  } catch (error) {
    console.error('Error loading:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadServices()
    }
  })
})
</script>

<template>
  <v-app>
    <v-container class="main-wrapper pa-6">
      <div class="search-header text-center mb-8">
        <h1>🔍 Најди Мајстор</h1>
        <p>Професионалци достапни веднаш – по локација и услуга</p>
      </div>

      <v-row class="filters" justify="center" align="center" no-gutters>
        <v-col cols="12" md="5" class="px-2 pb-4">
          <v-autocomplete
            v-model="searchService"
            :items="allServices"
            label="Тип на услуга"
            variant="solo-filled"
            color="warning"
            hide-details
            clearable
            class="input-field"
          />
        </v-col>
        <v-col cols="12" md="5" class="px-2 pb-4">
          <v-select
            v-model="searchCity"
            :items="cities"
            label="Одбери град"
            variant="solo-filled"
            color="warning"
            hide-details
            clearable
            class="input-field"
          />
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-row v-if="paginatedServices.length" class="service-grid">
        <v-col
          v-for="service in paginatedServices"
          :key="service.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-hover v-slot="{ props }">
            <v-card
              v-bind="props"
              class="glass-card profile-card"
              elevation="10"
            >
              <v-img :src="service.image" height="220" class="rounded-t-xl" cover />
              <v-card-text class="pa-4">
                <div class="text-h6 font-weight-bold text-yellow mb-2">
                  {{ service.name }} {{ service.lastName }}
                </div>
                <div class="subtitle">📍 {{ service.location }}</div>
                <div class="subtitle">{{ getJobIcon(service.job) }} {{ service.job }}</div>
                <div class="subtitle">⭐ {{ service.rating }}/5</div>

                <v-btn
                  block
                  color="warning"
                  class="mt-3 text-black font-weight-bold"
                  @click="goToDetails(service)"
                >
                  Контактирај ме
                </v-btn>

                <v-btn icon class="favorite-btn" @click="toggleFavorite(service)">
                  <v-icon :color="isFavorite(service) ? 'yellow' : 'white'">mdi-star</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row v-else justify="center" class="text-center mt-10">
        <v-col cols="12">
          <v-icon size="64" color="grey-lighten-1" class="mb-2 bounce">mdi-account-search</v-icon>
          <h3 class="text-grey-lighten-1">Нема пронајдени мајстори</h3>
          <p class="text-grey-lighten-1">Промени ги филтрите и пробај повторно</p>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-6">
        <v-pagination
          v-model="currentPage"
          :length="pageCount"
          color="yellow-darken-2"
          total-visible="5"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.main-wrapper {
  background: linear-gradient(135deg, #181818, #101010);
  border-radius: 24px;
  margin-top: 120px;
  margin-bottom: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  color: white;
}

.search-header h1 {
  font-size: 2.6rem;
  font-weight: 800;
  color: #ffc107;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.search-header p {
  color: #ccc;
  font-size: 1.1rem;
}

.input-field {
  background-color: #2c2c2c !important;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.cards-section {
  min-height: 400px;
}

.profile-card {
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
  transition: 0.3s ease;
  position: relative;
}

.profile-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 12px 28px rgba(255, 193, 7, 0.2);
}

.subtitle {
  font-size: 0.95rem;
  color: #ccc;
  margin-top: 4px;
}

.text-yellow {
  color: #ffc107;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #000;
  border-radius: 50%;
  z-index: 5;
}

.bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
