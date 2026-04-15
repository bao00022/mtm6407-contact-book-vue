<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../components/BackButton.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { addContact } from "../utils/contactsStore";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const company = ref("");
const relationship = ref("");
const note = ref("");

const goHome = () => {
  router.push("/");
};

const handleSubmit = () => {
  addContact({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    company: company.value,
    relationship: relationship.value,
    note: note.value,
  });
  router.push("/");
};
</script>

<template>
  <section class="form-page">
    <header class="top-bar">
      <BackButton @click="goHome" />

      <div class="actions">
        <Button type="cancel" @click="goHome" />
        <Button type="done" @click="handleSubmit" />
      </div>
    </header>

    <form class="form-content" @submit.prevent="handleSubmit">
      <Input v-model="firstName" label="First Name" name="firstName" placeholder="e.g. Jessica" />
      <Input v-model="lastName" label="Last Name" name="lastName" placeholder="e.g. Taylor" />
      <Input v-model="email" label="Email" name="email" type="email" placeholder="e.g. jessica@google.com" />
      <Input v-model="phone" label="Phone" name="phone" placeholder="e.g. +1 (613) 123-4567" />
      <Input v-model="company" label="Company" name="company" placeholder="e.g. Algonquin College" />
      <Input v-model="relationship" label="Relationship" name="relationship" placeholder="e.g. Friend" />
      <Input v-model="note" label="Note" name="note" placeholder="Add a note about this contact" />
    </form>
  </section>
</template>

<style scoped>
.form-page {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem 2rem;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.9rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.form-content {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
