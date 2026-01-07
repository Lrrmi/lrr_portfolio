import './../styles/potpourri.scss';
import potpourri from './../potpourri.json';
import { Link } from 'react-router-dom';

export default function Potpourri() {
    return (
        <div className="arrowWrapper">
             <div className="arrows">
            <Link className="topArrow" onClick={() => window.scrollBy({top: -window.innerHeight, behavior: "smooth"})}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dfdedf" class="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
            </svg>
            </Link>
            <Link className="bottomArrow" onClick={() => window.scrollBy({top: window.innerHeight, behavior: "smooth"})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dfdedf" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                </svg>
            </Link>
            </div>
        <div className="potpourri">
            <div className="drawLine"></div>
            {potpourri.map(newImage => (
                <img draggable="false" className="potpourriImage" src={newImage} alt="Visual of a project" />
            ))}
           
        </div>
        </div>
    );
}