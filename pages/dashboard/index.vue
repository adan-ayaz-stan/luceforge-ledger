<template>
  <div class="flex justify-center items-center">
    Dashboard: You are logged in. User Email: {{ user?.email }}

    <el-button type="danger" @click="signOut()">Log out</el-button>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    navigateTo("/");
  }
}
</script>

<style></style>
