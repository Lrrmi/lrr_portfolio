import './../styles/etcetera.scss';
import etcetera from './../etcetera.json';

export default function EtCetera() {
    return (
        <div className="etcetera">
            <div className="drawLine"></div>
            {etcetera.map(newImage => (
                <img draggable="false" className="etceteraImage" src={newImage} alt="Visual of a project" />
            ))}
        </div>
    );
}