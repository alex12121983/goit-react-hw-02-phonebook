import { Component } from 'react'
import Phonebook from './Phonebook/Phonebook'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { nanoid } from "nanoid";
import css from './App.module.css'

class App extends Component {
	state = {
		contacts: [],
		filter: '',
  	}
	createContact = (data) => {
		const newContact = {
			...data,
			id: nanoid(),
		}
		if (this.state.contacts.find(contact => 
			contact.name === newContact.name)) {
			alert(`${newContact.name} is already in contacts.`);
			return;
		  }
		this.setState((prevState) => {
			return {contacts: [...prevState.contacts, newContact]}
		});
	}
	
	changeFilter = (evt) => {
		const { value } = evt.target
        this.setState({
            filter: value,
        })
	}
	getVisibleContacts = () => {
		const { filter, contacts } = this.state;
		return contacts.filter(
			contact => {
				const name = contact.name.toLowerCase(); 
				const search = filter.toLowerCase();
				return name.includes(search);
			} 
		)
	  };
	removeContact = (id) => {
		this.setState((prev) => ({
			contacts: prev.contacts.filter((el) => el.id !== id)
		}))
	}
	render(){
		const { contacts, filter } = this.state;
		const visibleContacts = this.getVisibleContacts();
		return (
				 <div className={css.container}>
  					<h2>Phonebook</h2>
  					<Phonebook 
						createContact={this.createContact}
					/>
  					<h2>Contacts</h2>
  					<Filter
						value={filter}
						onChange={this.changeFilter}
					/>
  					<ContactList
						contacts={contacts}
						filterContacts={visibleContacts}
						filter={filter}
						removeContact={this.removeContact}
					/>
				</div>
			)
	}
}

export default App
