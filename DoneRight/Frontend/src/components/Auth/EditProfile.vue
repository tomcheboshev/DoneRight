<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="edit-profile-container">
      <h1 class="title">Aжурирај Профил</h1>

      <form @submit.prevent="submitChanges" class="edit-profile-form">
        <div class="form-grid">
          <div v-if="profile.profilePicture" class="profile-preview-container">
            <label for="imageUpload">
              <img
                :src="profile.profilePicture"
                alt="Profile Picture"
                class="profile-preview"
                title="Кликни за да смениш"
              />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleImageChange"
            />
          </div>

          <div class="input-group">
            <input type="text" id="firstName" v-model="profile.firstName" required />
            <label for="firstName">Име</label>
          </div>

          <div class="input-group">
            <input type="text" id="lastName" v-model="profile.lastName" required />
            <label for="lastName">Презиме</label>
          </div>

          <div class="input-group">
            <input type="email" id="email" v-model="profile.email" required />
            <label for="email">Е-пошта</label>
          </div>

          <div class="input-group">
            <input type="text" id="phone" v-model="profile.phone" required />
            <label for="phone">Телефон</label>
          </div>

          <div class="input-group">
            <input type="text" id="city" v-model="profile.city" required />
            <label for="city">Град</label>
          </div>
        </div>

        <button type="submit" class="submit-btn">Зачувај Промени</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore"
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage"
import { db } from "@/firebase"

const router = useRouter()

const profile = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  profilePicture: ""
})

const userDocId = ref(null)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      profile.value.email = user.email

      const q = query(collection(db, "users"), where("uid", "==", user.uid))
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data()
        userDocId.value = snapshot.docs[0].id

        profile.value.firstName = userData.firstName || ""
        profile.value.lastName = userData.lastName || ""
        profile.value.phone = userData.phone || ""
        profile.value.city = userData.city || ""

        const picRef = doc(db, "userProfilePictures", user.uid)
        const picSnap = await getDoc(picRef)
        if (picSnap.exists()) {
          profile.value.profilePicture = picSnap.data().profilePicture || ""
        }
      }
    }
  })
})

const handleImageChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const auth = getAuth()
  const currentUser = auth.currentUser
  const storage = getStorage()

  const fileRef = storageRef(storage, `profile_pictures/${currentUser.uid}`)

  try {
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)
    profile.value.profilePicture = url

    await updateDoc(doc(db, "userProfilePictures", currentUser.uid), {
      profilePicture: url
    })
  } catch (err) {
    console.error("Error uploading image:", err)
    alert("Неуспешно поставување на слика.")
  }
}

const submitChanges = async () => {
  if (!userDocId.value) return

  const auth = getAuth()
  const currentUser = auth.currentUser

  try {
    if (profile.value.email !== currentUser.email) {
      await updateEmail(currentUser, profile.value.email)
    }

    await updateDoc(doc(db, "users", userDocId.value), {
      firstName: profile.value.firstName,
      lastName: profile.value.lastName,
      phone: profile.value.phone,
      city: profile.value.city,
      email: profile.value.email
    })

    alert("Промените се успешно зачувани!")
    router.push("/user-profile")
  } catch (err) {
    if (err.code === "auth/requires-recent-login") {
      alert("За да ја промените е-поштата, прво најавете се повторно.")
    } else {
      console.error("Error updating profile:", err)
      alert("Неуспешно ажурирање на профилот.")
    }
  }
}
</script>

<style scoped>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.edit-profile-container {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #ffc107;
  margin-bottom: 15px;
}

.form-grid {
  display: grid;
  gap: 12px;
}

.input-group {
  position: relative;
  width: 92%;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: 0.3s;
  margin-top: 6px;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  border-color: #ffc107;
}

.input-group label {
  position: absolute;
  top: 54%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ddd;
  transition: 0.3s;
  pointer-events: none;
  background: transparent;
  padding: 0 5px;
}

.input-group input:focus + label,
.input-group input:valid + label,
.input-group input[readonly] + label {
  top: -2px;
  left: 5px;
  font-size: 12px;
  color: white;
  padding: 0 5px;
}

.profile-preview-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
}

.profile-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffc107;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #ff9d00, #ffcd38);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 15px;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #ffb400, #ffdf70);
}

@media (max-width: 480px) {
  .edit-profile-container {
    padding: 20px;
    max-width: 75%;
    margin-top: 30px;
  }

  .title {
    font-size: 22px;
  }

  .input-group input {
    font-size: 16px;
    padding: 12px;
  }

  .input-group {
    width: 91%;
  }

  .input-group label {
    font-size: 13px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 12px;
  }
}
</style>
