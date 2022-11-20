import { Card } from "react-bootstrap";
import "./Mytask.styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormMyTask } from "./FormMytask";

type Props = {
    priority: string;
    titulo: string;
    myTask: String;
};

export const Mytask = () => {
    const [priority, setPriority] = useState<string>("");
    const [titulo, setTitulo] = useState<string>("");
    const [myTask, setMyTask] = useState<string>("");

    return (
        <div className="mytask">
            <Card className="mx-auto my-1  border-light">
                <Card.Body>
                    <h1 className="title">Mis tareas</h1>
                    <FormMyTask setPriority={setPriority} setTitulo={setTitulo} setMytask={setMyTask} />
                    <Dashboard priority={priority} titulo={titulo} myTask={myTask} />
                </Card.Body>
            </Card>
        </div>
    );
};

const Dashboard = (props: Props) => {
    const [task, setTask] = useState<any>([]);
    const { priority, titulo, myTask } = props;

    useEffect(() => {
        const getConfig = () => ({
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        axios.get("https://goscrum-api.alkemy.org/task", getConfig())
            .then((res) => {
                setTask(res.data.result);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    const handleDelete = (id: number) => {
        console.log(id);       
        fetch(`https://goscrum-api.alkemy.org/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    /*const handleEdit = (id: number) => {
        console.log(id);
        fetch(`https://goscrum-api.alkemy.org/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: titulo,
                status: myTask,
                description: myTask,
                importance: priority,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };*/

    return (
        <div className="row mt-3 mx-0 px-0">
            <div className="col px-1">
                <div className="card-task card border-light">
                    <h3 className="card-title m-1">Nuevas</h3>
                    {task.map((item: any, index: number) =>
                        item.status === "NEW" &&
                        (priority === "" || item.importance === priority) &&
                        (titulo === "" || item.title.toLowerCase().includes(titulo)) &&
                        (myTask === "" || item.user.userName.toLowerCase().includes(myTask)) &&
                        (
                            <div
                                className="sub-card card m-1"
                                key={index}
                            >
                                <div className="card-body">
                                    <div className="d-flex">
                                        <h5 className="card-title">
                                            {item.title}
                                        </h5>
                                        
                                        <button
                                            type="button"
                                            className="btn-close mx-auto"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                            onClick={() => handleDelete(item._id)}
                                        />

                                    </div>
                                    <p className="card-text">
                                        <span>{item.createdAt}</span>
                                        <br />
                                        <span>
                                            {item.user.userName}
                                        </span>
                                        <br />
                                        <span className="badge rounded-pill bg-danger p-1">
                                            {item.status}
                                        </span>
                                        {
                                            item.importance === "HIGH" && (
                                                <span className="badge rounded-pill bg-danger  p-1">
                                                    {item.importance}
                                                </span>
                                            )
                                        }{
                                            item.importance === "MEDIUM" && (
                                                <span className="badge rounded-pill bg-warning  p-1">
                                                    {item.importance}
                                                </span>
                                            )
                                        }{
                                            item.importance === "LOW" && (
                                                <span className="badge rounded-pill bg-success  p-1">
                                                    {item.importance}
                                                </span>
                                            )
                                        }
                                    </p>
                                    <p className="card-text">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="col px-1">
                <div className="card-task card border-light">
                    <h3 className="card-title m-1">En proceso</h3>
                    {task.map(
                        (item: any, index: number) =>
                            item.status === "IN PROGRESS" &&
                            (priority === "" || item.importance === priority) &&
                            (titulo === "" || item.title.toLowerCase().includes(titulo)) &&
                            (myTask === "" || item.user.userName.toLowerCase().includes(myTask)) &&
                            (
                                <div className="sub-card card m-1" key={index}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h5 className="card-title">
                                                {item.title}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close mx-auto"
                                                data-bs-dismiss="alert"
                                            ></button>
                                        </div>
                                        <p className="card-text">
                                            <span>{item.createdAt}</span>
                                            <br />
                                            <span>{item.user.userName}</span>
                                            <br />
                                            <span className="badge rounded-pill bg-warning  p-1">
                                                {item.status}
                                            </span>
                                            <span className="badge rounded-pill bg-primary  p-1" >
                                                {item.importance}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="col px-1">
                <div className="card-task card border-light">
                    <h3 className="card-title m-1">Finalizadas</h3>
                    {
                        task?.map(
                            (item: any, index: number) =>

                                item.status === "FINISHED" &&
                                (priority === "" || item.importance === priority) &&
                                (titulo === "" || item.title.toLowerCase().includes(titulo)) &&
                                (myTask === "" || item.user.userName.toLowerCase().includes(myTask)) &&
                                (
                                    <div className="sub-card card m-1" key={index}>
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <h5 className="card-title">
                                                    {item.title}
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close mx-auto"
                                                    data-bs-dismiss="alert"
                                                ></button>
                                            </div>
                                            <p className="card-text">
                                                <span>{item.createdAt}</span>
                                                <br />
                                                <span>{item.user.userName}</span>
                                                <br />
                                                <span className="badge rounded-pill bg-success  p-1">
                                                    {item.status}
                                                </span>
                                                <span className="badge rounded-pill bg-primary  p-1">
                                                    {item.importance}
                                                </span>
                                            </p>
                                            <p className="card-text">

                                            </p>
                                        </div>
                                    </div>
                                )
                        )}
                </div>
            </div>
        </div>

    );
};





