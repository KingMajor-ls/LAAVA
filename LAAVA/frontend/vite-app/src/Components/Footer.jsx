import "../Styles/Footer.css"
import { GrTechnology} from "react-icons/gr";
import { GiFarmTractor } from "react-icons/gi";
import { SiVite } from "react-icons/si";
import { FaFacebook,FaReact } from "react-icons/fa";

import { DiYii } from "react-icons/di";


const Footer = () => {
    return (
        <div className="footer">
            <GrTechnology/>
            <FaFacebook />
            <FaReact />
            Farming looks mighty when your plow is a pencil, and you're a thousand miles from the corn field.
            <SiVite />
            <DiYii />
            <GiFarmTractor />
        </div>
    )
}

export default Footer
