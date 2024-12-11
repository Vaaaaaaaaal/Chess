<template>
  <div id="login-page">
    <img class="login-logo" src="/assets/Logo.png" />

    <div style="width: 400px">
      <div class="base-container">
        <form @submit.prevent="registerForm">
          <small id="username-error" class="p-error" v-if="submitted && !username">
            Username is required.
          </small>
          <div class="form-container">
            <InputText
              id="username"
              placeholder="Nom d'utilisateur"
              v-model="username"
              :class="{ 'p-invalid': submitted && !username }"
              fluid
              aria-describedby="username-error"
            />
          </div>

          <small id="password-error" class="p-error" v-if="submitted && !password">
            Mot de passe requis.
          </small>
          <div class="form-container">
            <Password
              placeholder="Mot de passe"
              id="password"
              v-model="password"
              :feedback="false"
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': submitted && !password }"
              aria-describedby="password-error"
              fluid
            />
          </div>

          <Button type="submit" label="S'inscrire" class="w-6" :loading="loading" />
        </form>

        <div class="separator">
          <div class="ligne"></div>
          <p>OU</p>
          <div class="ligne"></div>
        </div>

        <Button
          type="button"
          label="Se connecter"
          severity="secondary"
          @click="login"
          class="w-6 login"
          :disabled="loading"
        />
      </div>
    </div>
  </div>
  <Toast />
</template>

<script lang="ts" setup>
import { useUserService } from '@/composables/user/userService';
import { AxiosError } from 'axios';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const { register } = useUserService();

const router = useRouter();
const toast = useToast();
const username = ref('');
const password = ref('');
const loading = ref(false);
const submitted = ref(false);

const emit = defineEmits<{
  (e: 'registerSuccess', username: string): void;
}>();

const registerForm = async () => {
  submitted.value = true;

  if (!username.value || !password.value) {
    return;
  }

  try {
    loading.value = true;
    await register({ username: username.value, password: password.value });

    emit('registerSuccess', username.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Inscription réussie',
      life: 3000,
    });
    router.push('/');
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 401) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User already exists',
        life: 3000,
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error instanceof Error ? error.message : 'Register failed',
        life: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};

const login = () => {
  router.push('/login');
};
</script>

<style scoped>
.p-card {
  border-radius: 1rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.login {
  width: 100% !important;
  margin-top: 20px;
}
</style>
