<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackButton from "../components/BackButton.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { getContactById, updateContact } from "../utils/contactsStore";

const route = useRoute();
const router = useRouter();

const contactId = route.params.id;

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const company = ref("");
const relationship = ref("");
const note = ref("");

onMounted(() => {
  const contact = getContactById(contactId);
  if (!contact) {
    router.replace("/");
    return;
  }
  firstName.value = contact.firstName || "";
  lastName.value = contact.lastName || "";
  email.value = contact.email || "";
  phone.value = contact.phone || "";
  company.value = contact.company || "";
  relationship.value = contact.relationship || "";
  note.value = contact.note || "";
});

const goBack = () => {
  router.push(`/contact/${contactId}`);
};

const handleSubmit = () => {
  updateContact(contactId, {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    company: company.value,
    relationship: relationship.value,
    note: note.value,
  });
  router.push(`/contact/${contactId}`);
};
</script>

<template>
  <section class="form-page">
    <header class="top-bar">
      <BackButton @click="goBack" />

      <div class="actions">
        <Button type="cancel" @click="goBack" />
        <Button type="done" @click="handleSubmit" />
      </div>
    </header>

    <form class="form-content" @submit.prevent="handleSubmit">
      <Input v-model="firstName" label="First Name" name="firstName" />
      <Input v-model="lastName" label="Last Name" name="lastName" />
      <Input v-model="email" label="Email" name="email" type="email" />
      <Input v-model="phone" label="Phone" name="phone" />
      <Input v-model="company" label="Company" name="company" />
      <Input v-model="relationship" label="Relationship" name="relationship" />
      <Input v-model="note" label="Note" name="note" />
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
