<template>
  <div class="flex relative flex-col min-h-screen">
    <!-- Navigation bar -->
    <div
      class="flex flex-row gap-4 justify-between items-center p-3 px-6 border-b border-white"
    >
      <h3>Logo here</h3>

      <div class="flex flex-row gap-3">
        <a href="about" class="font-medium underline underline-offset-4"
          >About</a
        >
        <a href="functions" class="font-medium underline underline-offset-4"
          >Functions</a
        >
      </div>

      <a v-if="user" href="/dashboard">
        <el-button type="primary" rounded>Dashboard</el-button>
      </a>
      <a v-else href="/auth">
        <el-button type="primary" rounded>Login</el-button>
      </a>
    </div>

    <!-- Hero Section -->
    <div class="flex flex-col flex-1 gap-3 justify-center items-center">
      <h1>Financials logger</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<style></style>
