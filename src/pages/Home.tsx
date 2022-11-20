import { Mytask, Navbar , Newtask } from "../components";

export const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col">
                    <Newtask />
                </div>
                <div className="col">
                    <Mytask />
                </div>
            </div>           
            
        </div>
    );
};

