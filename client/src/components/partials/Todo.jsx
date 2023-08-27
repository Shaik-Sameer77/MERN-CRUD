import React, { useState } from "react";
import moment from "moment/moment";
import {
  deleteTodoApi,
  markTodoApi,
  updateTodoApi,
} from "../../services/api.js";
import { toast } from "react-toastify";
import EditTodoModal from "./EditTodoModal.jsx";

function Todo({ todo, setRefreshList }) {
  const modalId = `editModal-${todo._id}`;

  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast("Deleted");
    } else {
      toast("Failed to Delete, please try again");
    }
  };

  const handleMark = async () => {
    const result = await markTodoApi({
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast(result.data.message);
    } else {
      toast("Failed to Mark, please try again");
    }
  };

  const textStyle = {
    textDecoration: todo.isCompleted ? "line-through" : "none",
  };

  return (
    <div
      className="card bg-light mx-4 my-3 "
      style={{ maxWidth: "24rem", minHeight: "13rem" }}
    >
      <div className="card-header">
        {todo.isCompleted ? "Completed" : "Not Completed"}
      </div>
      <div className="card-body">
        <h4 className="card-title" style={textStyle}>
          {todo.desc}
        </h4>
        <p className="card-text">{moment(todo.date).fromNow()}</p>
      </div>

      <div
        className="actionButtons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="deleteButton" style={{ margin: "15px" }}>
          <button
            style={{
              background: "red",
              border: "1px solid red",
              color: "white",
            }}
            className="btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="markTodo" style={{ margin: "15px" }}>
          <button className="btn" onClick={handleMark}>
            {todo.isCompleted ? "UnMark" : "Mark"}
          </button>
        </div>
        <div className="">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
            className="btn btn-outline-light"
          >
            Edit
          </button>
        </div>
      </div>

      <EditTodoModal todo={todo} setRefreshList={setRefreshList} modalId={modalId} />
    </div>
  );
}

export default Todo;
