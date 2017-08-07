import React, { Component } from 'react';
import PropType from 'prop-types';
import escapeString from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

class ListContacts extends Component {

  static propTypes = {
    contacts: PropType.array.isRequired,
    onDeleteContact: PropType.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query:query.trim()});
  }

  clearQuery = () => {
    this.setState({query:''});
  }

  render() {

    let { contacts, onDeleteContact } = this.props;
    let { query } = this.state;

    let showingContacts;

    if (query) {
      const match = new RegExp(escapeString(query), 'i');
      showingContacts = contacts.filter((contact) => {return match.test(contact.name)});
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts' 
            placeholder = 'Contact search...'
            value = {query}
            onChange = {(event) => {this.updateQuery(event.target.value)}}
            />
            <Link 
              to="/create"
              className='add-contact'
            >Add Contact</Link>
        </div>

        {contacts.length !== showingContacts.length && (
          <div className='showing-contacts'>
            <span className=''>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={event => {this.clearQuery()}}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
        {showingContacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className='contact-remove' onClick={() => {onDeleteContact(contact)}}>
              Remove
            </button>
          </li>
        ))}
      </ol>
      </div>
    )
  }
}


export default ListContacts;