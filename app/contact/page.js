// YourComponent.js
"use client";   

import { useState } from 'react';

const YourComponent = () => {
  const [form, setForm] = useState({
    first_name: '',
    email: '',
    message: '',
    term_checkbox: false,
  });

    const url_message = 'https://script.google.com/macros/s/AKfycby0bgJuGUwB4ltdEHfAyJed14jHiL4_o1mRU6lvl9UfY2iIKN-Q7az_avwKPFYkyTs/exec';


    const url_parameter = 'alma_dance';

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { first_name, email, message } = form;

    if (first_name !== '' && message !== '' && email !== '') {
      setFormStatus({
        type: 'success',
        message: 'Wir haben Ihre Nachricht erhalten. Wir werden uns bei Ihnen melden.',
      });

      // Send message
      const data = [first_name, message, email, url_parameter];
      sData(data);

      // Disable form fields after submission
      setForm((prevForm) => ({
        ...prevForm,
        first_name: '',
        email: '',
        message: '',
        term_checkbox: false,
      }));
    } else {
      setFormStatus({
        type: 'error',
        message: 'Es sind fehlende Informationen vorhanden, bitte füllen Sie das Formular aus.',
      });
    }
  };

  // Save Booking hl
  const sData = (arr) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(arr));

    console.log('posting registration in API');
    fetch(url_message, {
      method: 'POST',
      body: formData,
    })
      .then((rep) => rep.json())
      .then((data) => {
        console.log('Subscribed');
      });
  };

  return (
    <section className="contact_form row_am bg-gray-100 p-8" data-aos="fade-in" data-aos-duration="1500">
      <div className="contact_inner">
        <div className="container">
          <div className="section_title" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
            <span className="title_badge">Message us</span>
            <h2>Nachricht hinterlassen</h2>
            <p>Füllen Sie das Formular unten aus, unser Team wird sich bald bei Ihnen melden.</p>
          </div>
          <form
            id="form_message"
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-aos="fade-up"
            data-aos-duration="1500"
          >

            <div className="col-span-1">
              <div className="form-group">
                <input
                  id="first_name"
                  type="text"
                  className="form-control bg-gray-200 p-2 rounded-md"
                  placeholder="Name *"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="form-group">
                <input
                  id="email"
                  type="email"
                  className="form-control bg-gray-200 p-2 rounded-md"
                  placeholder="Email *"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="form-group">
                <textarea
                  id="message"
                  className="form-control bg-gray-200 p-2 rounded-md"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-span-2">
              <div className="coustome_checkbox">
                <label htmlFor="term_checkbox" className="flex items-center text-gray-800">
                  <input
                    type="checkbox"
                    id="term_checkbox"
                    checked={form.term_checkbox}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Ich bin mit dem Erhalt von E-Mails, Newslettern und Werbebotschaften einverstanden.
                </label>
              </div>
            </div>

            <div className="col-span-2 text-right">
              <div className="btn_block">
                <div id="display_success" className={`text-${formStatus?.type === 'error' ? 'red' : 'green'}-600`}>
                  {formStatus?.message}
                </div>
                <div id="btn_bottom"></div>
              </div>
            </div>
            <button
              id="summit"
              className="btn puprple_btn ml-0 bg-purple-500 text-white rounded-md p-2"
              type="submit"
            >
              Einreichen
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default YourComponent;
