import React from 'react';
import ContactList from './component/ContactList.js';
import './scss/app.scss';

const App = () => {

    return (
        <div className='app-wrapper'>
			<div className='main-wrapper'>
				<h1>Contact Manager</h1>
				<ContactList/>
			</div>
        </div>
    );
};

export default App;
