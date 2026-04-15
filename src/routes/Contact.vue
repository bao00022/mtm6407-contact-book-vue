<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackButton from "../components/BackButton.vue";
import Button from "../components/Button.vue";
import { deleteContact, getContactById } from "../utils/contactsStore";

const route = useRoute();
const router = useRouter();

const contact = ref(null);

const contactId = route.params.id;

onMounted(() => {
  contact.value = getContactById(contactId);
});

const initials = computed(() => {
  if (!contact.value) return "";
  const first = contact.value.firstName?.[0] || "";
  const last = contact.value.lastName?.[0] || "";
  return `${first}${last}`.toUpperCase();
});

const goHome = () => router.push("/");
const goEdit = () => router.push(`/edit/${contactId}`);

const handleDelete = () => {
  deleteContact(contactId);
  router.push("/");
};
</script>

<template>
  <section v-if="contact" class="contact-page">
    <header class="top-bar">
      <BackButton @click="goHome" />

      <div class="actions">
        <Button type="delete" @click="handleDelete" />
        <Button type="edit" @click="goEdit" />
      </div>
    </header>

    <section class="profile">
      <div class="profile-avatar">{{ initials }}</div>
      <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
      <p>{{ contact.relationship }}</p>
    </section>

    <section class="info-list">
      <article class="info-card">
        <h3>Email</h3>
        <p>{{ contact.email }}</p>
      </article>

      <article class="info-card">
        <h3>Phone</h3>
        <p>{{ contact.phone }}</p>
      </article>

      <article class="info-card">
        <h3>Company</h3>
        <p>{{ contact.company }}</p>
      </article>

      <article class="info-card">
        <h3>Note</h3>
        <p>{{ contact.note }}</p>
      </article>
    </section>
  </section>

  <section v-else class="contact-page not-found">
    <p>Contact not found.</p>
    <button class="back-home" type="button" @click="goHome">Back to Home</button>
  </section>
</template>

<style scoped>
.contact-page {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem 2rem;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.profile {
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.profile-avatar {
  width: 9rem;
  height: 9rem;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 2.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile h2 {
  margin: 0;
  color: #111827;
}

.profile p {
  margin: 0;
  color: #4b5563;
  font-size: 1.05rem;
}

.info-list {
  margin-top: 1.2rem;
  display: grid;
  gap: 0.9rem;
}

.info-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.8rem;
  padding: 0.85rem 0.95rem;
  background: #ffffff;
}

.info-card h3 {
  margin: 0;
  color: #6b7280;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.info-card p {
  margin: 0.35rem 0 0;
  color: #111827;
  line-height: 1.5;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  color: #6b7280;
}

.back-home {
  border: none;
  border-radius: 0.6rem;
  padding: 0.55rem 0.9rem;
  color: #ffffff;
  background: #2563eb;
  cursor: pointer;
}

.back-home:hover {
  background: #1d4ed8;
}
</style>
