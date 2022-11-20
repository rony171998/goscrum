import { Formik, Form, Field, ErrorMessage,   } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./Newtask.styles.css";
import { useEffect, useState } from "react";
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Newtask = () => {
    return (
        <div className="newtask">
            <Card className="mx-auto my-1 border-light">
                <Card.Body>
                    <h1 className="title">Crear tarea</h1>
                    <h1 className="card-title">Crea tus tareas</h1>
                    <FormNewTask />
                </Card.Body>
            </Card>
        </div>
    );
};

const FormNewTask = () => {
    const navigate = useNavigate();

    const [state, setState] = useState([]); //state de la nueva tarea
    const [priority, setPriority] = useState([]); //state de la lista de prioridades

    const getState = () => {
        const token = localStorage.getItem("token")
        fetch("https://goscrum-api.alkemy.org/task/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setState(data.result.status);
            }
            )
            .catch((error) => {
                console.error("Error:", error);
            }
            );
    };

    const getPriority = () => {
        const token = localStorage.getItem("token")
        fetch("https://goscrum-api.alkemy.org/task/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setPriority(data.result.importance);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const postTask = (values: any) => {
        const token = localStorage.getItem("token")
        fetch("https://goscrum-api.alkemy.org/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ task: values }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        getState();
        getPriority();
    }, []);

    const CustomTexAreaComponent = () => (
        <textarea
            className="form-control"
            id="exampleTextarea"
            rows={4}
            required
            name="description"
        />
    );

    return (
        <div>
            <Formik
                initialValues={{ description: "primera tarea" }}
                onSubmit={(e: any, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        console.log(e);
                        postTask(e);
                    }, 400);
                    navigate("/", { replace: true });
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="input-group">
                            <div className="form-group">
                                <Field
                                    type="text"
                                    name="title"
                                    className="form-control card-subtitle"
                                    placeholder="Titulo"
                                    required
                                />
                                <ErrorMessage
                                    name="titulo"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mx-auto">
                                <Field
                                    as="select"
                                    name="status"
                                    className="form-select  card-subtitle"
                                    required
                                >
                                    <option value="">
                                        Seleccionar estado
                                    </option>
                                    {state.map((item: string) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="status"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    as="select"
                                    name="importance"
                                    className="form-select card-subtitle"
                                    required
                                >
                                    <option value="">
                                        Seleccionar prioridad
                                    </option>
                                    {priority.map((item: string) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="importance"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <Field
                                as={CustomTexAreaComponent}
                                className="form-control card-subtitle"
                                placeholder="Descripcion"
                                name="description"
                            />

                            <ErrorMessage
                                name="descripcion"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <Button
                            className="mt-3"
                            variant="danger"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Crear
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
