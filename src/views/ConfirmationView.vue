<template>
  <div class="confirmation-container">
    <h1 v-if="loading">Confirming your email...</h1>
    <h1 v-else-if="success">Email confirmed successfully!</h1>
    <h1 v-else>Failed to confirm email. Please try again.</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  // Extract the hash fragment and decode it
  const hash = window.location.hash.substring(1); // Remove the `#`
  console.log('Hash:', hash);

  // Decode the URL
  const decodedHash = decodeURIComponent(hash);

  // Check if the hash contains the Supabase confirmation URL
  if (!decodedHash.startsWith('https://')) {
    console.error('Invalid confirmation URL in hash');
    loading.value = false;
    success.value = false;
    return;
  }

  try {
    // Verify the confirmation URL with Supabase
    const response = await fetch(decodedHash);
    if (response.ok) {
      console.log('Email confirmed successfully');
      success.value = true;
    } else {
      console.error('Email confirmation failed:', response.statusText);
      success.value = false;
    }
  } catch (error) {
    console.error('Error confirming email:', error);
    success.value = false;
  } finally {
    loading.value = false;
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }
});


</script>

<style scoped>
.confirmation-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 1.5rem;
}
</style>
