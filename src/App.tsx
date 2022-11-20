import { Home, Login, P404, Register } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ProtectedRoutes } from "./components";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <Container fluid style={{maxWidth:"1440px"}}>
                <Routes >
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<P404 />} />
                    </Route>
                </Routes>
            </Container>
        </HashRouter>
    );
}

export default App;
