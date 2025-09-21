import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveTodo, updateTodo } from "../api/TodoApiService";
import { useAuthContext } from "../security/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";

let todo;
function TodoPage() {
  const [description, setDescription] = useState("");
  const [targetDate, setTaragetDate] = useState("");
  const { username } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveTodo(username, id);
      todo = response.data;
      setDescription(todo.description);
      setTaragetDate(todo.targetDate);
    };
    fetchData();
  }, [id, username]);

  async function handleSubmit(values) {
    // await updateTodo(username, { ...todo, ...values });
    // navigate("/todos");
    console.log({ ...todo });
    console.log("validated sucessfully");
  }

  async function handleValidate(values) {
    let error = {};
    if (values.description.length < 5)
      error.description = "Description must be 5 or more characters long!";
    if (values.targetDate == null)
      error.description = "Enter a valid Target Date!";
    console.log({ ...todo, ...values });
    return error;
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <Formik
        initialValues={{ description, targetDate }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={handleValidate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {() => (
          <Form>
            <ErrorMessage
              name="description"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                className="form-control"
                id="description"
                name="description"
                type="text"
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="targetDate">Target Date</label>
              <Field
                className="form-control"
                id="targetDate"
                name="targetDate"
                type="date"
              />
            </fieldset>
            <button type="submit" className="m-5 btn btn-success">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TodoPage;
