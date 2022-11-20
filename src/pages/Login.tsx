import { Button, Card } from "react-bootstrap";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    return (
        <div>
            <Card style={{ maxWidth: "439px" }} className="mx-auto my-5">
                <Card.Body>
                    <h1>Iniciar sesíon</h1>
                    <Basic />
                </Card.Body>
            </Card>
        </div>
    );
};

const Basic = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{ userName: "", password: "" }}
                validate={values => {
                    const errors: any = {};
                    if (!values.userName) {
                        errors.userName = "* Campo obligatorio";
                    }

                    if (!values.password) {
                        errors.password = "* Campo obligatorio";
                    } else if (values.password.length < 8) {
                        errors.password =
                            "Password must be at least 8 characters";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        setSubmitting(false);
                        fetch("https://goscrum-api.alkemy.org/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                localStorage.setItem("token", data.result.token);
                                localStorage.setItem("userName", data.result.user.userName);
                                navigate("/");
                               
                            }
                            )
                            .catch((error) => {
                                console.error("Error:", error);
                            }
                            );

                    }, 400);
                    navigate("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="userName">userName</label>
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
                            <label htmlFor="password">Contraseña</label>
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

                        <Button
                            className="Button mt-3"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>

                        <div className="mt-3">
                            <a href="#/register">Registrarme</a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
