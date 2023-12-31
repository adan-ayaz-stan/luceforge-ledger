<template>
  <div>
    <h2>Sign Up</h2>

    <el-form @submit="onSubmit" :label-position="'top'">
      <el-form-item v-bind="emailProps" label="Email">
        <el-input placeholder="Email Address" v-model="email" />
      </el-form-item>

      <el-form-item v-bind="fullNameProps" label="Full name">
        <el-input placeholder="Full name" v-model="fullName" />
      </el-form-item>

      <el-form-item v-bind="passwordProps" label="Password">
        <el-input placeholder="Password" v-model="password" type="password" />
      </el-form-item>

      <el-form-item v-bind="passwordConfirmProps" label="Password confirmation">
        <el-input
          placeholder="Confirm password"
          v-model="passwordConfirm"
          type="password"
        />
      </el-form-item>

      <div>
        <el-button type="primary" native-type="submit">Submit</el-button>
        <el-button native-type="button" @click="resetForm()"> Reset </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().email().label("Email address"),
    fullName: yup.string().required().label("Full name"),
    password: yup.string().required().min(6).label("Password"),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match")
      .label("Password confirmation"),
  })
);

const { defineField, handleSubmit, resetForm, setFieldError } = useForm({
  validationSchema: schema,
});

const elPlusConfig = (state: any) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required,
  },
});

const [fullName, fullNameProps] = defineField("fullName", elPlusConfig);
const [email, emailProps] = defineField("email", elPlusConfig);
const [password, passwordProps] = defineField("password", elPlusConfig);
const [passwordConfirm, passwordConfirmProps] = defineField(
  "passwordConfirm",
  elPlusConfig
);

const onSubmit = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName,
      },
    },
  });

  if (error) {
    setFieldError("email", "This email is already registered.");
    return;
  }

  navigateTo("/dashboard");
});
</script>

<style></style>
