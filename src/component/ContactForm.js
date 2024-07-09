import React, { useState, useEffect } from 'react';
import ContactService from '../service/ContactService.js';
import Loader from './Loader.js';

const ContactForm = (props) => {
    
    const [contact, setContact] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(props.contact != null)
            setContact(props.contact);
    }, [props.contact]);

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(contact.id != null)
                await ContactService.updateContact(contact.id, contact);
            else
                await ContactService.createContact(contact);
            props.close();
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response);
                if(error.response.data.email){
                    alert('Email already exists!');
                }
                else{
                    alert('Someting went wrong!')
                }
            }
            else{
                alert('Unexpected error occured!')
            }
        }
        
    };

    return (
        loading ? 
        <Loader/> :
        <div className='contact-form-wrapper'>
            <h2>Add Contact</h2>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={contact.first_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='row'>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={contact.last_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='row'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='row'>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={contact.phone_number}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='btn-wrapper'>
                    <button type="submit">{contact.id != null ? 'Update': 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
