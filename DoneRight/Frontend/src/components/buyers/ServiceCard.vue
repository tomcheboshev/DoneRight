<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
// import PreloaderSection from '@/components/common/PreloaderSection.vue'

const router = useRouter()

const services = ref([])
const favorites = ref([])
const isLoading = ref(true)
const searchService = ref('')
const searchCity = ref('')

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

const getJobIcon = (job) => {
  const icons = {
    'Електричар': '⚡',
    'Водоводџија': '🔧',
    'Дрводелец': '🪚',
    'Механичар': '🔩'
  }
  return icons[job] || '💼'
}

const toggleFavorite = (service) => {
  const index = favorites.value.findIndex(f => f.id === service.id)
  if (index === -1) favorites.value.push(service)
  else favorites.value.splice(index, 1)
}

const isFavorite = (service) => favorites.value.some(f => f.id === service.id)

const goToDetails = (service) => {
  router.push({ path: `/service/${service.id}` })
}

const loadServices = async () => {
  isLoading.value = true
  try {
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
  loadServices()
})
</script>
<template>
  <v-app>
    <!-- Search Area -->
    <v-container class="search-section py-16">
      <v-sheet
        elevation="10"
        class="search-box rounded-xl mx-auto"
        color="#212529"
        max-width="900"
      >
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold text-yellow">Најди Мајстор</h1>
            <p class="text-grey-lighten-1">Пронајди најдобрите професионалци во твојот град</p>
          </v-col>

          <v-col cols="12" md="5">
            <v-autocomplete
              v-model="searchService"
              :items="allServices"
              label="Пребарај услуга..."
              density="comfortable"
              color="warning"
              variant="outlined"
              clearable
              hide-details
            />
          </v-col>

          <v-col cols="12" md="5">
            <v-select
              v-model="searchCity"
              :items="cities"
              label="Внеси град..."
              density="comfortable"
              color="warning"
              variant="outlined"
              clearable
              hide-details
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>

    <!-- Cards -->
    <v-container>
      <v-row justify="center" class="mt-10">
        <v-col
          v-for="service in filteredServicesList"
          :key="service.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-hover v-slot="{ props }">
            <v-card
              class="profile-card rounded-xl text-white"
              color="#1f1f1f"
              elevation="8"
              v-bind="props"
            >
              <v-img
                :src="service.image"
                height="240px"
                class="rounded-t-xl"
                cover
              ></v-img>

              <v-card-text class="py-4 px-5">
                <div class="text-h6 font-weight-bold text-yellow">
                  {{ service.name }} {{ service.lastName }}
                </div>

                <div class="text-grey-lighten-1 text-subtitle-2 mt-2">
                  {{ getJobIcon(service.job) }} {{ service.job }}
                </div>
                <div class="text-grey-lighten-1 text-subtitle-2">
                  📍 {{ service.location }}
                </div>
                <div class="text-grey-lighten-1 text-subtitle-2 mb-2">
                  ⭐ {{ service.rating }}/5
                </div>

                <v-btn
                  block
                  color="warning"
                  variant="flat"
                  class="text-black font-weight-bold mb-2"
                  @click="goToDetails(service)"
                >
                  Контактирај ме
                </v-btn>

                <v-btn
                  icon
                  class="favorite-btn"
                  @click="toggleFavorite(service)"
                >
                  <v-icon
                    :color="isFavorite(service) ? 'yellow' : 'white'"
                    size="24"
                  >
                    mdi-star
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<style scoped>
.text-yellow {
  color: #ffc107;
}

.search-section {
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  border-radius: 20px;
}

.search-box {
  padding: 50px 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.15);
}

.profile-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.profile-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2);
}

.favorite-btn {
  background-color: black;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
