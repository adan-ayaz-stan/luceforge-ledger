<template>
  <div class="flex justify-center items-center">
    Dashboard: You are logged in. User Email: {{ user?.email }}
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<style></style>
