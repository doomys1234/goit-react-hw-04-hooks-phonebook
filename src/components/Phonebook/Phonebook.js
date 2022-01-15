import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Phonebook.module.scss';

export default function Phonebook({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);

        break;
      case 'number':
        setNumber(value);

        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form
      className={s.form}
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <h3 className={s.title}>Name</h3>
      <input
        className={s.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={e => {
          handleChange(e);
        }}
      />
      <h3 className={s.title}>Number</h3>
      <input
        className={s.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={e => {
          handleChange(e);
        }}
      />
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}
Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
