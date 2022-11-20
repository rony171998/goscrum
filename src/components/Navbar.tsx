import { Link } from "react-router-dom";

export const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.href = '/';
    }

    const userName = localStorage.getItem('userName');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)" , background:"#FFFFFF"}}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src="./GoScrum 1.png" alt="" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor03"
                    aria-controls="navbarColor03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                    </ul>

                    <button className="btn btn-danger my-2 my-sm-0 mx-3">
                        Donar
                    </button>
                    <div className="mx-3">Tareas Creadas: 0 {userName}</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert"
                        onClick={
                            handleLogout
                        }>
                    </button>
                    
                </div>
            </div>
        </nav>
    );
};


