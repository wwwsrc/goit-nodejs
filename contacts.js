const fs = require("fs");
const path = require("path");

let contactsPath = path.join(__dirname, "db", "contacts.json");
function listContacts() {
  try {
    return JSON.parse(
      fs.readFileSync(contactsPath, "utf-8", async (err) => {
        if (err) throw err;
        //   JSON.parse(data);
      })
    );
  } catch (error) {
    console.log("error: ", error);
  }
}

function getContactById(contactId) {
  try {
    // const contact = listContacts();
    const resultId = listContacts().find(
      (contactSearched) => contactSearched.id === contactId
    );
    return resultId;
  } catch (error) {
    console.log("error: ", error);
  }
}

function removeContact(contactId) {
  try {
    const contact = listContacts();
    const removedContact = contact.filter((el) => el.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(removedContact), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

function addContact(name, email, phone) {
  try {
    const contacts = listContacts();
    const addNewContact = [
      ...contacts,
      { name, email, phone, id: contacts.length + 1 },
    ];
    fs.writeFileSync(contactsPath, JSON.stringify(addNewContact), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
