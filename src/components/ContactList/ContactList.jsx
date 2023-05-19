import { Component } from 'react'
import PropTypes from "prop-types";
import css from './ContactList.module.css'

class ContactList extends Component {

    render() {
        const {contacts, filterContacts, filter, removeContact} = this.props
        return (
                <ul className={css.list_group}>
                    { filter.length > 0 
                    ? filterContacts.map((filterContact) => (
                        <li key={filterContact.id} className={css.list_group_item}>
                            {filterContact.name}: {filterContact.number}
                            <button 
                                type="button" 
                                className={css.btn_danger}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                    : contacts.map((contact) => (
                        <li 
                            key={contact.id} 
                            className={css.list_group_item}
                        >
                            {contact.name}: {contact.number}
                            <button 
                                type="button" 
                                className={css.btn_danger}
                                onClick={() => removeContact(contact.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                    }
                </ul>
        )
    }
}

export default ContactList

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        contact: PropTypes.string.isRequired,
      })
    ).isRequired,
    filter: PropTypes.string.isRequired,
  };