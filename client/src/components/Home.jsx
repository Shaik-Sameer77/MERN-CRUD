import React, { useEffect, useState } from "react";
import Header from "./partials/Header.jsx";
import Todo from "./partials/Todo.jsx";
import AddTodoModal from "./partials/AddTodoModal.jsx";
import { useNavigate } from "react-router-dom";
import { getTodoListApi, getToken } from "../services/api.js";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate=useNavigate();

  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if(!getToken()){
      navigate("/login");
    }

    fetchTodoList()
  }, [refreshList])
  
  const fetchTodoList = async () => {
    const result=await getTodoListApi()
    console.log('todolist',result.data.data)
    if(result.status===200 && result.data.status === 200){
      setList(result.data.data.todos.reverse())
    }
  }
  
  

  return (
    <div>
      <Header setRefreshList={setRefreshList}/>
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-center mt-4">

          {
            list.map((todo) =><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
          }

          
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light "

          style={{
            background: "lightgreen",
            border: "1px solid lightgreen",
            color: "white",
          }}
        >
          Add
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  );
};

export default Home;
