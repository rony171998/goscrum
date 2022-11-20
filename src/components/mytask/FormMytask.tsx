import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

type TaskProps = {
    setPriority: (priority: string) => void;
    setTitulo: (titulo: string) => void;
    setMytask: (mytask: string) => void;
};

export const FormMyTask = (props:TaskProps) => {
    const { setPriority , setTitulo ,setMytask } = props;
    const navigate = useNavigate();
    const [priorityList, setPriorityList] = useState<any>([]);

    const CustomInputComponent = () => (
        <input
            className="form-check-input me-1"
            type="radio"
            name="optionsRadios"
            id="optionsRadios2"
            value="option2"
            color="success"
            onChange={handlerEveryTask}
        />
    );
    const CustomInputComponent2 = () => (
        <input
            className="form-check-input me-1"
            type="radio"
            name="optionsRadios"
            id="optionsRadios2"
            value="option2"
            color="success"
            onChange={handlerMytask}
        />
    );
    const handlerPriority = (e: any) => {
        setPriority(e.target.value);
    };
    const handlerTitulo = (e: any) => {
        setTitulo(e.target.value);
    };
    const handlerMytask = () => {
        const mytask = localStorage.getItem("userName") || "";
        setMytask(mytask);
    };
    const handlerEveryTask = () => {
        setMytask('');
    };

    useEffect(() => {
        getPriority();
    }, []);

    const getPriority = () => {
        const token = localStorage.getItem("token");
        fetch("https://goscrum-api.alkemy.org/task/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setPriorityList(data.result.importance))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <Formik
                initialValues={{ email: "", password: "" }}
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
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                    navigate("/", { replace: true });
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="input-group">
                            <div className="form-check">
                                <Field
                                    as={CustomInputComponent}
                                    type="text"
                                    name="todas"
                                    className="form-check-input"
                                    onChange={handlerEveryTask}
                                    onClick={handlerMytask}
                                />
                                <label
                                    className="card-subtitle form-check-label mx-2"
                                    htmlFor="todas"
                                >
                                    Todas
                                </label>

                                <ErrorMessage
                                    name="todas"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-check">
                                <Field
                                    as={CustomInputComponent2}
                                    type="text"
                                    name="misTareas"
                                    className="form-check-input"
                                    onChange={handlerMytask}
                                    
                                />
                                <label
                                    className="card-subtitle form-check-label mx-2"
                                    htmlFor="misTareas"
                                    
                                >
                                    Mis Tareas
                                </label>

                                <ErrorMessage
                                    name="misTareas"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mx-auto">
                                <Field
                                    type="text"
                                    name="titulo"
                                    className="form-control card-subtitle "
                                    placeholder="Selecionar por titulo"
                                    onChange={handlerTitulo}
                                />
                                <ErrorMessage
                                    name="titulo"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <Field
                                    as="select"
                                    name="selectpriority"
                                    className="form-select card-subtitle "
                                    onChange={handlerPriority}
                                >
                                    <option value="">
                                        todas las prioridad
                                    </option>
                                    {priorityList.map((item:string) => {
                                        return <option value={item} key={item}>{item}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage
                                    name="selectpriority"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};