import './../styles/contact.scss';

export default function Contacts() {
    return (
        <div className="contact">
            <h2 className="contactsHeader">Contact</h2>
            <br></br>
            <p className="contactsDetails">
                Mr. Dursley was the director of a firm called Grunnings, which made drills.
                He was a big, beefy man with hardly any neck, although he did have a very
                large mustache. Mrs. Dursley was thin and blonde and had nearly twice the
                usual amount of neck, which came in very useful as she spent so much of her
                time craning over garden fences, spying on the neighbors. The Dursleys had a
                small son called Dudley and in their opinion there was no finer boy anywhere.
            </p>
            <br></br>
            <div className="contactsLinkedin">
                <p className="contactsLinkedinLabel">LinkedIn:</p>
                <a className="contactsLinkedinLink" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">https://linkedin.com</a>
            </div>
            <br></br>
            <div className="contactsEmail">
                <p className="contactsEmailLabel">Email:</p>
                <p className="contactsEmail">prinny@hotmail.com</p>
            </div>
            <br></br>
            <h2 className="contactsServicesHeader">Services</h2>
            <br></br>
            <div className="servicesContent">
                <p>Offers Full Design Service</p>
                <br></br>
                <p>Concept Modeling and Initial Manufacturing Drawings</p>
                <br></br>
                <p>Small Scale Prototyping</p>
            </div>
        </div>
    );
}