<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="profile-container">
      <h1 class="title">Поставете Профилна Слика</h1>
      <p class="subtitle">Изберете или влечете слика за прикачување.</p>

      <!-- Custom File Upload Box -->
      <label class="upload-box" @dragover.prevent @drop="handleDrop">
        <input type="file" accept="image/*" @change="handleFileChange" />
        <div class="upload-content">
          <span class="upload-icon">📷</span>
          <p class="upload-text">Кликнете или влечете слика тука</p>
        </div>
      </label>

      <!-- Image Preview & Cropper -->
      <div v-if="selectedFile" class="cropper-container">
        <img ref="imageRef" :src="selectedFile" class="cropper-image" />
      </div>

      <button v-if="selectedFile" @click="submitProfilePicture" class="submit-btn">
        Заврши
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { useRouter } from "vue-router";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const router = useRouter();
const auth = getAuth();
const storage = getStorage();

const imageRef = ref(null);
const cropper = ref(null);
const selectedFile = ref(null);

// Handle file selection via input change
const handleFileChange = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

// Handle drag-and-drop events
const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  processFile(file);
};

// Process the file and initialize Cropper
const processFile = (file) => {
  if (file) {
    console.log("✅ Selected file:", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedFile.value = e.target.result;
      console.log("✅ FileReader result (data URL):", selectedFile.value.slice(0, 100));
      nextTick(() => {
        console.log("🔄 Waiting for imageRef to be set...");
        if (imageRef.value) {
          console.log("✅ imageRef is set:", imageRef.value);
          cropper.value = new Cropper(imageRef.value, {
            aspectRatio: 1,
            viewMode: 2,
            autoCropArea: 1,
            zoomable: true,
            scalable: true,
            movable: true,
            cropBoxResizable: true,
            ready() {
              console.log("✅ Cropper initialized successfully.");
            }
          });
        } else {
          console.error("❌ imageRef is not set. Cannot initialize Cropper.");
        }
      });
    };
    reader.onerror = (err) => {
      console.error("❌ FileReader error:", err);
    };
    reader.readAsDataURL(file);
  } else {
    console.error("❌ No file selected.");
  }
};

// Submit the cropped image to Firebase Storage and update the new collection "userProfilePictures"
const submitProfilePicture = async () => {
  console.log("🚀 Submitting cropped image...");
  if (!cropper.value) {
    alert("Мора да изберете и прилагодите профилна слика.");
    console.error("❌ Cropper not initialized.");
    return;
  }

  const croppedCanvas = cropper.value.getCroppedCanvas();
  if (!croppedCanvas) {
    console.error("❌ Cropper did not return a canvas.");
    return;
  }

  const croppedImage = croppedCanvas.toDataURL("image/png");
  console.log("✅ Cropped image data URL (first 100 chars):", croppedImage.slice(0, 100));

  try {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in!");
      console.error("❌ No authenticated user found.");
      return;
    }

    // Create a reference in Firebase Storage for the user's profile picture
    const storageReference = storageRef(storage, `profile_pictures/${user.uid}`);
    console.log("✅ Firebase storage reference created:", storageReference);

    // Upload the image to Firebase Storage
    const uploadTask = await uploadString(storageReference, croppedImage, "data_url");
    console.log("✅ Image uploaded to Firebase Storage:", uploadTask);

    // Retrieve download URL
    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log("✅ Download URL from Firebase:", downloadURL);

    // Update (or create) the document in the "userProfilePictures" collection
    const profilePicDocRef = doc(db, "userProfilePictures", user.uid);
    console.log("📄 Updating Firestore document at:", profilePicDocRef);

    await setDoc(profilePicDocRef, { profilePicture: downloadURL });
    console.log("✅ Firestore document created/updated successfully with profilePicture.");

    router.push("/success");
  } catch (error) {
    console.error("❌ Error during submission process:", error);
  }
};
</script>

<style scoped>
/* Background */
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #212529;
  padding: 20px;
}

/* Overlay */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
}

/* Profile Container */
.profile-container {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 25px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Title */
.title {
  font-size: 22px;
  font-weight: 700;
  color: #ffc107;
  margin-bottom: 10px;
}

/* Subtitle */
.subtitle {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 20px;
}

/* Upload Box */
.upload-box {
  width: 100%;
  height: 140px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.05);
}

.upload-box:hover {
  border-color: #ffc107;
  background: rgba(255, 255, 255, 0.1);
}

/* Hide default input */
.upload-box input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* Upload Content */
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

/* Cropper Container */
.cropper-container {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  margin: 15px 0;
}

.cropper-image {
  width: 100%;
  max-height: 300px;
  border-radius: 8px;
}

/* Submit Button */
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
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-container {
    max-width: 90%;
    padding: 20px;
  }
  .title {
    font-size: 20px;
  }
  .subtitle {
    font-size: 13px;
  }
  .upload-box {
    height: 120px;
  }
  .upload-icon {
    font-size: 26px;
  }
  .upload-text {
    font-size: 12px;
  }
  .submit-btn {
    padding: 12px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .profile-container {
    max-width: 95%;
    padding: 15px;
  }
  .title {
    font-size: 18px;
  }
  .subtitle {
    font-size: 12px;
  }
  .upload-box {
    height: 110px;
  }
  .upload-icon {
    font-size: 24px;
  }
  .upload-text {
    font-size: 11px;
  }
  .submit-btn {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
