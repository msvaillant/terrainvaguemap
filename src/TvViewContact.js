import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as emailjs from "emailjs-com";

import "./TvViewContact.css";

import { mailjsSettings } from './settings.json';

// TODO: add photos sending functionality
// TODO: add form validation

const initialFormState = {
  email: "",
  name: "",
  address: "",
  description: "",
  state: "",
  link: "",
  photos: ""
};

const TvInput = ({
  id = "",
  name,
  value,
  type = "text",
  placeholder,
  onChangeHandler
}) => {
  return (
    <div>
      <label htmlFor={id}>{placeholder}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

const TvTextArea = ({ id = "", name, value, placeholder, onChangeHandler }) => {
  return (
    <div>
      <label htmlFor={id}>{placeholder}</label>
      <textarea name={name} id={id} value={value} onChange={onChangeHandler} />
    </div>
  );
};

const TvViewContact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormState);

  const _сhangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData(previous =>
      Object.assign(
        {},
        { ...previous },
        {
          [name]: value
        }
      )
    );
  };

  const _submitHandler = event => {
    event.preventDefault();
    emailjs
      .send(
        mailjsSettings.serviceId,
        mailjsSettings.templateId,
        formData,
        mailjsSettings.userId
      )
      .then(() => {
        //TODO: remove alert
        /*eslint no-alert: "warn"*/
        alert("Form successfully submitted !");
        setFormData(initialFormState);
      })
      .catch(err => {
        //TODO: remove alert
        /*eslint no-alert: "warn"*/
        alert('Sorry, error occured whyle sending the request, please try again ):');
        console.log(err);
      });
  };

  return (
    <div className="tv-contact-content">
      <p>{t("contact.header")}</p>
      <form className="tv-contactform" onSubmit={_submitHandler}>
        <TvInput
          id="1"
          name="email"
          value={formData.email}
          type="email"
          placeholder={t("contact.labels.email")}
          onChangeHandler={_сhangeHandler}
        />
        <TvInput
          id="2"
          name="name"
          value={formData.name}
          type="text"
          placeholder={t("contact.labels.name")}
          onChangeHandler={_сhangeHandler}
        />
        <TvInput
          id="3"
          name="address"
          value={formData.address}
          type="text"
          placeholder={t("contact.labels.address")}
          onChangeHandler={_сhangeHandler}
        />
        <TvTextArea
          id="4"
          value={formData.description}
          name="description"
          placeholder={t("contact.labels.description")}
          onChangeHandler={_сhangeHandler}
        />
        <TvTextArea
          id="5"
          value={formData.state}
          name="state"
          placeholder={t("contact.labels.state")}
          onChangeHandler={_сhangeHandler}
        />
        <TvInput
          id="6"
          name="link"
          value={formData.link}
          type="url"
          placeholder={t("contact.labels.link")}
          onChangeHandler={_сhangeHandler}
        />
        <button className="tv-send">{t("contact.send")}</button>
        <TvInput
          id="7"
          name="photos"
          value={formData.photos}
          type="text"
          placeholder={t("contact.labels.photos")}
          onChangeHandler={_сhangeHandler}
        />
      </form>
    </div>
  );
};

export default TvViewContact;
