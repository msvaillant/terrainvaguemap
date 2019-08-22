import React from 'react';
import { useTranslation } from 'react-i18next';

import './TvViewContact.css';

const TvInput = ({
    id = '',
    type='text',
    placeholder
}) => {
    return (
        <div>
            <label htmlFor={id}>{placeholder}</label>
            <input id={id} type={type}/>
        </div>
    );
};

const TvTextArea = ({
    id = '',
    placeholder
}) => {
    return (
        <div>
            <label htmlFor={id}>{placeholder}</label>
            <textarea id={id}/>
        </div>
    );
};

const TvViewContact = () => {
    const { t } = useTranslation();

    const submitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting !");
    }

    return (
        <div className="tv-contact-content">
            <p>{t('contact.header')}</p>
            <form className="tv-contactform" onSubmit={submitHandler}>
                <TvInput id='1' type='email' placeholder={ t('contact.labels.email') }/>
                <TvInput id='2' type='text' placeholder={ t('contact.labels.name') }/>
                <TvInput id='3' type='text' placeholder={ t('contact.labels.address') }/>
                <TvTextArea id='4' placeholder={t('contact.labels.description')}/>
                <TvTextArea id='5' placeholder={t('contact.labels.state')}/>
                <TvInput id='6' type='url' placeholder={ t('contact.labels.link') }/>
                <button className="tv-send">{t('contact.send')}</button>
                <TvInput id='7' type='text' placeholder={ t('contact.labels.photos') }/>
            </form>
        </div>
    );
};

export default TvViewContact;