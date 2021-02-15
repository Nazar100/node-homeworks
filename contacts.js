const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

function listContacts() {
  return (
    fs
      .readFile(contactsPath)
      .then((data) => data.toString())
      // .then((d) => console.log(d))
      .catch((err) => console.log(err.message))
  );
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return JSON.parse(contacts).find((c) => c.id === contactId);
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = JSON.parse(contacts).filter((c) => c.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const parsedContacts = JSON.parse(contacts);
    parsedContacts.push({
      name,
      phone,
      email,
      id: parsedContacts[parsedContacts.length - 1].id + 1,
    });
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
