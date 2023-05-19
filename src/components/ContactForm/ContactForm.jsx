import { useState } from 'react';
import { FormWrapper, Form, AddContact, Button } from './ContactForm.style';
import PropTypes from 'prop-types';

// const initialState = {
//   name: '',
//   number: '',
// };

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChangeInput = e => {
    const targetInput = e.currentTarget.name;
    switch (targetInput) {
      case 'name':
        setName(e.currentTarget.value);
        break;

      case 'number':
        setNumber(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addContact({ name, number });
          setName('');
          setNumber('');
        }}
      >
        <AddContact>
          Name
          <input
            value={name}
            onChange={onChangeInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </AddContact>

        <AddContact>
          Number
          <input
            value={number}
            onChange={onChangeInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </AddContact>
        <Button type="submit">Add contact</Button>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
