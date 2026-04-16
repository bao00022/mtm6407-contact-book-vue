<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ChevronRight } from "lucide-vue-next";
import Button from "../components/Button.vue";
import { getContacts } from "../utils/contactsStore";

const router = useRouter();
const searchKeyword = ref("");

const contacts = ref([]);

onMounted(() => {
  contacts.value = getContacts().sort((a, b) => a.firstName.localeCompare(b.firstName));
});

const filteredContacts = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  if (!keyword) {
    return contacts.value;
  } else {
    const filtered = contacts.value.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(keyword);
    });
    return filtered;
  }
});

// Generate a random avatar color class
function randomColor() {
  const colors = ["avatar-red", "avatar-green", "avatar-blue", "avatar-orange", "avatar-pink", "avatar-teal"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const goToAdd = () => {
  router.push("/add");
};
</script>

<template>
  <section class="home">
    <header class="home-header">
      <h1>Contact</h1>
      <Button type="add" @click="goToAdd" />
    </header>

    <form class="search-form" @submit.prevent>
      <input v-model="searchKeyword" type="text" placeholder="Search by name..." />
    </form>

    <ul v-if="filteredContacts.length" class="contact-list">
      <li v-for="contact in filteredContacts" :key="contact.id" class="contact-item">
        <RouterLink class="contact-link" :to="`/contact/${contact.id}`">
          <div class="contact-info-wrap">
            <div class="avatar" :class="randomColor()">
              {{ `${contact.firstName?.[0] || ""}${contact.lastName?.[0] || ""}`.toUpperCase() }}
            </div>

            <div class="contact-info">
              <p class="name">{{ contact.firstName }} {{ contact.lastName }}</p>
              <p class="email">{{ contact.email }}</p>
            </div>
          </div>
          <ChevronRight :size="16" />
        </RouterLink>
      </li>
    </ul>

    <p v-else class="empty-state">No contacts found.</p>
  </section>
</template>

<style scoped>
.home {
  max-width: 720px;
  margin: 2.5rem auto;
  padding: 0 1rem 2rem;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.9rem;
}

.home-header h1 {
  font-size: 2rem;
  line-height: 1.1;
  color: #111827;
}

.search-form {
  margin: 1rem 0;
}

.search-form input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  border-radius: 0.65rem;
  padding: 0.75rem 0.95rem;
  font-size: 1rem;
  color: #111827;
}

.search-form input:focus {
  outline: 2px solid #93c5fd;
  border-color: #60a5fa;
  background: #ffffff;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.contact-item {
  border-radius: 0.7rem;
}

.contact-link {
  width: 100%;
  padding: 0.7rem;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
}

.contact-item:hover {
  background: #f3f4f6;
}

.contact-info-wrap {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.avatar {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  color: #484242;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
}

.avatar-blue {
  background: #b9cff1;
}

.avatar-teal {
  background: #beeeea;
}

.avatar-orange {
  background: #edceb8;
}

.avatar-green {
  background: #c1efd2;
}

.avatar-pink {
  background: #f0bcd3;
}

.avatar-red {
  background: #f1c7c7;
}

.name {
  color: #111827;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.email {
  margin: 0.15rem 0 0;
  color: #6b7280;
  font-size: 0.92rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  color: #6b7280;
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .home {
    margin-top: 1.5rem;
  }

  .home-header h1 {
    font-size: 1.7rem;
  }

  .contact-item {
    padding: 0.65rem;
  }
}
</style>
