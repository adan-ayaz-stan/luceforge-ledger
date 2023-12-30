<template>
  <div>
    <h2>Sign In</h2>

    <el-form @submit="onSubmit" :label-position="'top'">
      <el-form-item v-bind="emailProps" label="Email">
        <el-input placeholder="Email Address" v-model="email" />
      </el-form-item>

      <el-form-item v-bind="passwordProps" label="Password">
        <el-input
          placeholder="Password"
          v-model="password"
          type="password"
          show-password
        />
      </el-form-item>

      <div>
        <el-button type="primary" native-type="submit">Login</el-button>
        <el-button native-type="button" @click="resetForm()"> Reset </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from "yup";

const supabase = useSupabaseClient();

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().email().label("Email address"),
    password: yup.string().required().min(6).label("Password"),
  })
);

const { defineField, handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: schema,
});

const elPlusConfig = (state: any) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required,
  },
});

const [email, emailProps] = defineField("email", elPlusConfig);
const [password, passwordProps] = defineField("password", elPlusConfig);

const onSubmit = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    setErrors({
      email: "Invalid credentials.",
    });
    return;
  }

  navigateTo("/dashboard");
});
</script>

<style></style>
