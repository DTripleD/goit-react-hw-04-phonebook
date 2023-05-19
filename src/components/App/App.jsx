import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { AppWrapper } from './App.styles';
import { nanoid } from 'nanoid';

const LS_KEY = 'contacts_list';

const initContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));

  const [contacts, setContacts] = useState(() => savedContacts ?? initContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const addContact = ({ name, number }) => {
    const id = nanoid();
    const isExist = contacts.some(
      value => value.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(name + 'is already in contacts.');
      return;
    }

    setContacts(prevState => {
      return [...prevState, { id, name, number }];
    });
  };

  const filterElements = getFilteredContacts();

  return (
    <AppWrapper>
      <h2>Phonebook</h2>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        filterElements={filterElements}
        onDeleteContact={onDeleteContact}
      />
    </AppWrapper>
  );
};

export default App;
