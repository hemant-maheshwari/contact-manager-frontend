import React, { useEffect, useState } from 'react';
import ContactService from '../service/ContactService.js';
import Modal from './Modal.js';
import ContactForm from './ContactForm.js';
import ContactHistory from './ContactHistory.js';
import Pusher from 'pusher-js';

const ContactList = () => {

    const [contacts, setContacts] = useState([]);
    const [historyModalFlag, setHistoryModalFlag] = useState(false);
    const [contactModalFlag, setContactModalFlag] = useState(false);
    const [createModalFlag, setCreateModalFlag] = useState(false);
	const [history, setHistory] = useState({});
    const [contact, setContact] = useState({});

    useEffect(() => {
        loadContacts();
    }, []);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('41514dccd3f5dbe19eaa', {
            cluster: 'us2',
        });

        const channel = pusher.subscribe('contacts');
        channel.bind('updated', function(data) {
            console.log(data);
            updateContactInState(data.contact);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const updateContactInState = (updatedContact) => {
        setContacts(prevContacts => {
            const filteredContacts = prevContacts.filter(contact => contact.id !== updatedContact.id);
            const updatedContacts = [...filteredContacts, updatedContact];
            return updatedContacts;
        });
    };    
    
    const loadContacts = async () => {
        const result = await ContactService.getContacts();
        setContacts(result.data);
    };

    const deleteContact = async (id) => {
        await ContactService.deleteContact(id);
        loadContacts();
    };

    const closeHistoryModal = () => {
    	setHistoryModalFlag(false);
  	};

	const openHistoryModal = async (id) => {
        const result = await ContactService.getContactHistory(id);
        setHistory(result.data);
        setHistoryModalFlag(true);
  	};

    const editContact = (contact) => {
        setContact(contact);
        setContactModalFlag(true);
    }

    const closeEditModal = () => {
        setContactModalFlag(false);
    }

    const showUpdatedContact = () => {
        loadContacts();
        closeEditModal();
        closeCreateModal();
    }

    const closeCreateModal = () => {
    	setCreateModalFlag(false);
  	};

	const openCreateModal = () => {
    	setCreateModalFlag(true);
  	};

    return (
        <div className='contact-list'>
            <div className='create-btn-wrapper'>
                <button className='create-btn' onClick={openCreateModal}>Add Contact</button>
            </div>
			<h2>Contacts</h2>
            <div className='contact-table'>
                <div className='row'>
                    <div className='cell'>Name</div>
                    <div className='cell'>Email</div>
                    <div className='cell'>Phone Number</div>
                    <div className='cell'>Actions</div>
                </div>
                {contacts.map((contact) => (
                    <div key={contact.id} className='row'>
                        <div className='cell'>{contact.first_name} {contact.last_name}</div>
                        <div className='cell'>{contact.email}</div>
                        <div className='cell'>{contact.phone_number}</div>
                        <div className='cell action-cell'>
                            <button className='history-btn' onClick={() => openHistoryModal(contact.id)}>History</button>
                            <button className='edit-btn' onClick={() => editContact(contact)}>Edit</button>
                            <button className='delete-btn' onClick={() => deleteContact(contact.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={historyModalFlag} onClose={closeHistoryModal}>
				<ContactHistory history={history}/>
			</Modal>
            <Modal show={contactModalFlag} onClose={closeEditModal}>
				<ContactForm contact={contact} close={showUpdatedContact}/>
			</Modal>
            <Modal show={createModalFlag} onClose={closeCreateModal}>
				<ContactForm close={showUpdatedContact}/>
			</Modal>
        </div>
    );
};

export default ContactList;
