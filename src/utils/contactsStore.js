import { seedContacts } from "./data";

const STORAGE_KEY = "contacts";

const persistContacts = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const getContacts = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    return JSON.parse(raw);
  } else {
    persistContacts(seedContacts);
    return seedContacts;
  }
};

export const getContactById = (id) => {
  return getContacts().find((contact) => String(contact.id) === String(id)) || null;
};

export const addContact = (contactData) => {
  const contacts = getContacts();
  const id = crypto.randomUUID();
  const newContact = {
    id,
    ...contactData,
  };
  const updatedContacts = [...contacts, newContact];

  persistContacts(updatedContacts);
};

export const updateContact = (id, contactData) => {
  const contacts = getContacts();
  const updatedContacts = [];

  for (const contact of contacts) {
    if (String(contact.id) === String(id)) {
      updatedContacts.push({ ...contact, ...contactData, id: contact.id });
    } else {
      updatedContacts.push(contact);
    }
  }

  persistContacts(updatedContacts);
};

export const deleteContact = (id) => {
  const contacts = getContacts();
  const updatedContacts = [];

  for (const contact of contacts) {
    if (String(contact.id) !== String(id)) {
      updatedContacts.push(contact);
    }
  }

  persistContacts(updatedContacts);
};
