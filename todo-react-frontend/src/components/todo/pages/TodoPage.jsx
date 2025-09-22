import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewTodo, retrieveTodo, updateTodo } from "../api/TodoApiService";
import { useAuthContext } from "../security/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

function TodoPage() {
  const [description, setDescription] = useState("");
  const [targetDate, setTaragetDate] = useState("");
  const { username } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveTodo(username, id);
      setDescription(response.data.description);
      setTaragetDate(response.data.targetDate);
    };
    id && fetchData();
  }, [id, username]);

  async function handleSubmit(values) {
    const res = id
      ? await updateTodo(username, {
          id,
          username,
          done: false,
          ...values,
        })
      : await createNewTodo(username, {
          ...values,
          username,
          done: false,
        });

    if (res.status === 200) navigate("/todos");
  }

  async function handleValidate(values) {
    let error = {};
    if (values.description.length < 5)
      error.description = "Description must be 5 or more characters long!";
    if (
      values.targetDate === null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid
    )
      error.description = "Enter a valid Target Date!";
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
