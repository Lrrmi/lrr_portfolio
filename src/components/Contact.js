import './../styles/contact.scss';

export default function Contacts() {
    return (
        <div className="contact">
            <div className="contactsText">
                <h2 className="contactsHeader">Contact</h2>
                <br></br>
                <p className="contactsDetails">
                    For inquire about new projects or design services please email me at:
                </p>
                <br></br>
                <div className="contactsLinkedin">
                    <p className="contactsLinkedinLabel">LinkedIn:</p>
                    <a className="contactsLinkedinLink" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/robertleeadams</a>
                </div>
                <br></br>
                <div className="contactsEmail">
                    <p className="contactsEmailLabel">Email:</p>
                    <p className="contactsEmail">rmladams25@gmail.com</p>
                </div>
                <br></br>
                <h2 className="contactsServicesHeader">Services</h2>
                <br></br>
                <div className="servicesContent">
                    <p>Product & Furniture Design Services</p>
                    <br></br>
                    <p>3D Concept/Render Modeling & Production Modeling</p>
                    <br></br>
                    <p>Rendering & Drafting</p>
                    <br></br>
                    <p>Small & Full Scale Prototyping services</p>
                    <br></br>
                    <div className="drawLine"></div>
                    <br></br>
                    <br></br>
                </div>
            </div>
            <div className="contactsImage"></div>
        </div>
    );
}