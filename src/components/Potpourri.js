import './../styles/potpourri.scss';
import potpourri from './../potpourri.json';

export default function Potpourri() {
    return (
        <div className="potpourri">
            <div className="drawLine"></div>
            {potpourri.map(newImage => (
                <img draggable="false" className="potpourriImage" src={newImage} alt="Visual of a project" />
            ))}
        </div>
    );
}