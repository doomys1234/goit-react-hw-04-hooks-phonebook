import { useState, useEffect } from 'react';
import Phonebook from './components/Phonebook/Phonebook';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';
import s from './App.module.scss';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts') ?? []);
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    console.log('App', name, number);
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already exists`);
      return;
    }
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([...contacts, newContact]);
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const deleteContact = numId => {
    setContacts(contacts.filter(contact => contact.id !== numId));
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredItem = contacts.filter(item =>
    item.name.toLowerCase().includes(normalizedFilter),
  );
  console.log(filteredItem);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <Phonebook onSubmit={addContact} />
      <h2 className={s.contacts}>Contacts</h2>

      <Filter value={filter} onChange={filterChange} />
      <Contacts contacts={filteredItem} onClick={deleteContact} />
    </div>
  );
}
