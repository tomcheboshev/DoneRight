<template>
  <v-divider class="my-8" />

<h3 class="text-h6 font-weight-bold text-yellow mb-4">🔐 Промени лозинка</h3>

<v-form ref="passwordForm" @submit.prevent="changePassword">
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        v-model="newPassword"
        label="Нова лозинка"
        type="password"
        color="warning"
        variant="outlined"
        :rules="[v => !!v || 'Внеси лозинка', v => v.length >= 6 || 'Минимум 6 карактери']"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="confirmPassword"
        label="Потврди лозинка"
        type="password"
        color="warning"
        variant="outlined"
        :rules="[v => !!v || 'Потврди ја лозинката', v => v === newPassword || 'Лозинките не се совпаѓаат']"
      />
    </v-col>
  </v-row>

  <v-btn
    type="submit"
    color="warning"
    class="mt-2 font-weight-bold text-black"
    block
  >
    🔄 Ажурирај лозинка
  </v-btn>
</v-form>

</template>

<script setup>
import { ref } from 'vue'
import { getAuth, updatePassword } from 'firebase/auth'


const newPassword = ref('')
const confirmPassword = ref('')

const changePassword = async () => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!newPassword.value || newPassword.value !== confirmPassword.value) {
    alert('Внесените лозинки не се совпаѓаат.')
    return
  }

  try {
    await updatePassword(user, newPassword.value)
    newPassword.value = ''
    confirmPassword.value = ''
    alert('Лозинката е успешно променета!')
  } catch (error) {
    console.error('Error updating password:', error)
    if (error.code === 'auth/requires-recent-login') {
      alert('За да ја смените лозинката, најавете се повторно.')
    } else {
      alert('Грешка при промена на лозинката.')
    }
  }
}

</script> 