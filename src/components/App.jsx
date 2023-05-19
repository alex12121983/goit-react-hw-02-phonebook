import { Component } from 'react'
import Phonebook from './Phonebook/Phonebook'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { nanoid } from "nanoid";
import css from './App.module.css'

class App extends Component {
	state = {
		contacts: [
			// {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
			// {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
			// {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
			// {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
		  ],
		filter: '',
  	}
	contactId = () => {
		return nanoid()
	};
	createContact = (data) => {
		const newContact = {
			...data,
			id: this.contactId(),
		}
		if (this.state.contacts.find(contact => 
			contact.name === newContact.name
			|| contact.number === newContact.number)) {
			alert(`${newContact.name} is already in contacts.`);
			return;
		  }
		this.setState((prevState) => {
			return {contacts: [...prevState.contacts, newContact]}
		});
	}
	searchContact = (evt) => {
		const { value } = evt.target
        this.setState({
            filter: value,
        })
		const filterContacts = this.state.contacts.filter(
			contact => {
				const name = contact.name.toLowerCase(); 
				const search = this.state.filter.toLowerCase();
				return name.includes(search);
			} 
		)
		this.setState({
            filterContacts: filterContacts,
        })
	}
	removeContact = (id) => {
		this.setState((prev) => ({
			contacts: prev.contacts.filter((el) => el.id !== id)
		}))
	}
	render(){
		return (
				 <div className={css.container}>
  					<h2>Phonebook</h2>
  					<Phonebook 
						createContact={this.createContact}
					/>
  					<h2>Contacts</h2>
  					<Filter
						filter={this.state.filter}
						searchContact={this.searchContact}
					/>
  					<ContactList
						contacts={this.state.contacts}
						filterContacts={this.state.filterContacts}
						filter={this.state.filter}
						removeContact={this.removeContact}
					/>
				</div>
			)
	}
}

export default App
