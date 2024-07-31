import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import TaskBoard from "../components/TaskBoard";
import LandingPage from "../components/LandingPage";
import SearchBar from "../components/SearchBar";
import SortOptions from "../components/SortOptions";
import Button from "../components/Button";
import TaskForm from "../components/TaskForm";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState("Todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.location.replace('/home');
    }
    fetchTasks();
  }, [location.search]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view and manage your tasks.");
        return;
      }
      const res = await axios.get("https://task-manager-backend-8npn.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      setError("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    let filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "recent") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, sortOption]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://task-manager-backend-8npn.onrender.com/api/tasks",
        { title, description, column },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setColumn("Todo");
      setIsModalOpen(false);
      fetchTasks();
      toast.success('Task created successfully!');
    } catch (error) {
      setError("Failed to create task.");
      toast.error("Failed to create task.");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {token ? (
        <>
          <div className="flex justify-between items-center">
            <Button onClick={() => setIsModalOpen(true)} className="btn-sm bg-info text-base-100 mb-2 mt-6">
              Add Task
            </Button>
          </div>
          <div className="flex flex-wrap justify-between bg-base-100 rounded-lg shadow p-4 my-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <TaskBoard tasks={filteredTasks} setTasks={setTasks} />
          {isModalOpen && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h2 className="font-bold text-lg">Add Task</h2>
                <TaskForm
                  handleSubmit={handleCreateTask}
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  column={column}
                  setColumn={setColumn}
                  error={error}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default HomePage;
