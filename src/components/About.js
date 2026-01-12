import './../styles/about.scss';

export default function About() {
    return (
        <div className="about">
            <div className="aboutDiv">
                <img draggable="false" className="aboutImage" src={process.env.PUBLIC_URL+"/images/DSC_9635.jpg"} alt="Lee Adams"></img>
                <div className="aboutContent">
                    <h2 className="aboutHeader">Design Philosophy</h2>
                    <p>
                        <b>About</b>
                        <br></br><br></br>
                        I am an American industrial designer trained in both traditional woodworking techniques and contemporary manufacturing methods of design. With a Masters of Fine Art in Furniture Design from Savannah College of Art and Design, I am committed to progress through iteration, always seeking with each new project to produce a better product than the last.
                        <br></br><br></br>
                        With a keen interest in how design’s role affects society and our physical world, I am committed to the process of improvement so that my craft may continue to evolve in an ever-changing world. My desire for refinement and knowledge is never ceasing, and is expressed through continued research into new materials, manufacturing methods, following design trends, and new tools of trade.
                        <br></br><br></br>
                        Having served both as a design consultant assisting others and as a leading design director of projects, I understand the importance of working within branding constraints to create products that delight. If the client requires something completely new, I have created innovative products as well. In this regard, I can flexibly accommodate and fill whichever role is needed for the design process at the time.
                        <br></br><br></br>
                        I believe in blending our human needs with an appreciation for natural beauty. We should not rely on mimicry to imitate other materials, but should strive to bring out the unique beauty of each material through its intrinsic qualities, aesthetic values, and even individual imperfections. My goal is not only to create durable, delightful and desirable products for the betterment of our environment along with the people it serves, but also be sure to have fun along the way and never take things too seriously.
                        <br></br><br></br><br></br>
                        <b>Design Process</b>
                        <br></br><br></br>
                        Initially I work closely with the client to translate their vision into drawings and interactive 3-D models in order to materialize their idea into a defined product. While working with clients or other designers, I believe in collaborative iteration, focusing the design process on a successful outcome. All the participants have initial ideas about a project and they are like different colors split from a prism. The goal is to be sure we are on the same wavelength to be sure the design path is properly illuminated.
                        <br></br><br></br>
                        Once the design constraints are defined, I work within these parameters to produce renders, scale models, physical prototyping, or whatever is needed for the client to see and approve the production work. Then I work with the client’s team or help select contracted vendors to cost-effectively produce the desired item.
                    </p>
                </div>
                <br></br><br></br>
                <div className="drawLine"></div>
                <br></br><br></br>
            </div>
        </div>
    );
}