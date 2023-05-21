import { Component } from 'react'
import ContactItem from '../ContactItem/ContactItem'
import PropTypes from "prop-types";
import css from './ContactList.module.css'

class ContactList extends Component {

    render() {
        const {contacts, filterContacts, filter, removeContact} = this.props
        return (
                <ul className={css.list_group}>
                    { filter.length > 0 
                    ? filterContacts.map((filterContact) => (
                        <ContactItem 
                            key={filterContact.id}
                            contact={filterContact}
                            removeContact={removeContact}
                        />
                    ))
                    : contacts.map((contact) => (
                        <ContactItem 
                            key={contact.id}
                            contact={contact}
                            removeContact={removeContact}
                        />
                    ))
                    }
                </ul>
        )
    }
}

export default ContactList

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    filter: PropTypes.string.isRequired,
  };