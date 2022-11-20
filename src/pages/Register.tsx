import "../App.css";
import { Button, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetch('https://goscrum-api.alkemy.org/auth/data' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setData(data.result);
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
        );

    }, []);

    return (
        <div>
            <Card style={{ maxWidth: "439px" }} className="mx-auto my-5">
                <Card.Body>
                    <h1>Registro</h1>
                    <FormRegister data={data} />
                </Card.Body>
            </Card>
        </div>
    );
};

type FormRegisterProps = {
    data: any;
}

const FormRegister = (props: FormRegisterProps) => {
    const { data } = props; // rol , region ,continente

    const registerUser = (values: any) => {
        fetch('https://goscrum-api.alkemy.org/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                  userName: values.userName,
                  password: values.password,
                  email: values.email,
                  teamID: values.teamID,
                  role: values.role,
                  continent: values.continent,
                  region: values.region,
                },
              }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div>
            <Formik
                initialValues={{ userName: "", email: "", password: "", role: "", continent: "", region: "" }}
                validate={values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = "* Campo obligatorio";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Invalid email address";
                    }

                    if (!values.password) {
                        errors.password = "* Campo obligatorio";
                    } else if (values.password.length < 8) {
                        errors.password =
                            "Password must be at least 8 characters";
                    }

                    if (!values.userName) {
                        errors.userName = "* Campo obligatorio";
                    }

                    if (values.role === "") {
                        errors.role = "* Campo obligatorio";
                    }
                    if (values.continent === "") {
                        errors.continent = "* Campo obligatorio";
                    }
                    if (values.region === "") {
                        errors.region = "* Campo obligatorio";
                    }
                    return errors;
                }}
                onSubmit={(values:any, { setSubmitting }) => {

                    setTimeout(() => {
                        setSubmitting(false);
                        console.log(values);                       
                        registerUser(values);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label className="mt-3" htmlFor="userName">Nombre de Usuario</label>
                            <Field
                                type="text"
                                name="userName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="userName"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="password">Contraseña</label>
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">

                            <Field
                                type="checkbox"
                                name="perteneces"
                                className="form-check form-switch">

                            </Field>
                            <label className="mt-3" htmlFor="rol">Perteneces a un equipo ya creado</label>

                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="teamID">TeamID</label>
                            <Field
                                type="text"
                                name="teamID"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="teamID"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="role">Rol</label>

                            <Field
                                as="select"
                                name="role"
                                className="form-select">
                                <option value="">Selecionar</option>
                                {
                                    data.Rol?.map((item: any) => {
                                        return <option key={item} value={item}>{item}</option>
                                    })

                                }
                            </Field>

                            <ErrorMessage
                                name="role"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="continent">Continente</label>

                            <Field
                                as="select"
                                name="continent"
                                className="form-select">
                                <option value="">Selecionar</option>
                                {
                                    data.continente?.map((item: any) => {
                                        return <option key={item} value={item}>{item}</option>
                                    })
                                }
                            </Field>

                            <ErrorMessage
                                name="continent"
                                component="div"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mt-3" htmlFor="region">Region</label>

                            <Field
                                as="select"
                                name="region"
                                className="form-select">
                                <option value="">Selecionar</option>
                                {
                                    data.region?.map((item: any) => {
                                        return <option key={item} value={item}>{item}</option>
                                    })
                                }

                            </Field>

                            <ErrorMessage
                                name="region"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <Button
                            className="Button mt-3"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>

                        <div className="mt-3">
                            <Link to="/login">ir a Iniciar sesion</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};








