<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="p-4 space-y-3 rounded-xl border border-gray-400 shadow-xl md:min-w-[400px]"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="Sign In"><auth-sign-in /></el-tab-pane>
        <el-tab-pane label="Sign Up"><auth-sign-up /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<style></style>
