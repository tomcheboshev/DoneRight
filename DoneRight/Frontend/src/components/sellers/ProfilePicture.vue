<template>
  <v-app>
    <div class="background">
      <div class="overlay"></div>
      <v-container class="form-container" fluid>
        <v-card class="profile-card" elevation="10">
          <v-card-title class="text-center text-yellow-darken-2 text-h5 font-weight-bold">
            Поставете Профилна Слика
          </v-card-title>
          <v-card-subtitle class="text-center mb-4 text-white">
            Изберете или прилагодете слика за вашиот профил
          </v-card-subtitle>

          <!-- Upload Zone -->
          <label
            class="upload-box"
            @dragover.prevent
            @drop="handleDrop"
          >
            <input type="file" accept="image/*" @change="handleFileChange" />
            <div class="upload-content">
              <span class="upload-icon">📷</span>
              <p class="upload-text">Кликнете или влечете слика тука</p>
            </div>
          </label>

          <!-- Cropper -->
          <div v-if="selectedFile" class="cropper-wrapper mt-4">
            <img ref="imageRef" :src="selectedFile" class="cropper-image" />
          </div>

          <!-- Submit Button -->
          <v-btn
            v-if="selectedFile"
            color="warning"
            block
            class="mt-4 text-white font-weight-bold"
            @click="submitProfilePicture"
          >
            Заврши
          </v-btn>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import { getAuth } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const auth = getAuth()
const storage = getStorage()
const router = useRouter()

const selectedFile = ref(null)
const imageRef = ref(null)
const cropper = ref(null)

// Handle file select/drop
const handleFileChange = (e) => processFile(e.target.files[0])
const handleDrop = (e) => processFile(e.dataTransfer.files[0])

const processFile = (file) => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedFile.value = e.target.result
    nextTick(() => {
      if (imageRef.value) {
        cropper.value = new Cropper(imageRef.value, {
          aspectRatio: 1,
          viewMode: 1,
          autoCropArea: 1,
          responsive: true,
          zoomable: true,
          movable: true,
          scalable: true
        })
      }
    })
  }
  reader.readAsDataURL(file)
}

// Upload cropped image
const submitProfilePicture = async () => {
  if (!cropper.value) return
  const canvas = cropper.value.getCroppedCanvas()
  const croppedImage = canvas.toDataURL('image/png')

  const user = auth.currentUser
  if (!user) {
    alert('Не сте најавени')
    return
  }

  const storagePath = storageRef(storage, `profile_pictures/${user.uid}`)
  const upload = await uploadString(storagePath, croppedImage, 'data_url')
  const url = await getDownloadURL(upload.ref)

  await setDoc(doc(db, 'userProfilePictures', user.uid), {
    profilePicture: url
  })

  alert('Сликата е успешно поставена!')
  router.push('/success')
}
</script>

<style scoped>
.background {
  background-color: #212529;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.form-container {
  z-index: 1;
  display: flex;
  justify-content: center;
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 24px 16px;
  max-width: 420px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-card-title,
.v-card-subtitle {
  white-space: normal !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
  width: 100%;
  line-height: 1.4;
  margin: 0 auto;
}


/* Upload styling */
.upload-box {
  width: 100%;
  height: 140px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: 0.3s;
}
.upload-box:hover {
  border-color: #ffc107;
  background: rgba(255, 255, 255, 0.1);
}
.upload-box input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.upload-content {
  text-align: center;
}
.upload-icon {
  font-size: 30px;
  color: #ffc107;
}
.upload-text {
  font-size: 14px;
  color: #ddd;
  margin-top: 5px;
}

/* Cropper */
.cropper-wrapper {
  width: 100%;
  overflow: hidden;
}
.cropper-image {
  width: 100%;
  border-radius: 8px;
  max-height: 300px;
  object-fit: cover;
}

/* RESPONSIVE TEXT + CARD */
@media (max-width: 768px) {
  .profile-card {
    padding: 20px;
  }

  .v-card-title {
    font-size: 23px !important;
  }

  .v-card-subtitle {
    font-size: 18px !important;
  }

  .upload-text {
    font-size: 13px;
  }

  .upload-icon {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .profile-card {
    max-width: 95%;
    padding: 16px;
  }

  .v-card-title {
    font-size: 20px !important;
  }

  .v-card-subtitle {
    font-size: 15px !important;
  }

  .upload-text {
    font-size: 12px;
  }

  .upload-icon {
    font-size: 24px;
  }
}

</style>
