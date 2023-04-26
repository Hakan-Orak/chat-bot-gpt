import {Routes, Route} from "react-router-dom";
import Accueil from "./Accueil/Accueil.container";
import NavbarMenu from "./Navbar/Navbar.component";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            <NavbarMenu/>
            <Routes>
                <Route path='/' element={<Accueil/>}/>
                <Route path='/about' element={<> Page ABOUT </>}/>
            </Routes>
        </>
    );
}

export default App;
