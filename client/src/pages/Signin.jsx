import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AOuth from "../components/AOuth";

export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {loading, error} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      const data = await res.json();
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "Loading.." : "Sign in"}
        </button>
        <AOuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an Acount?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-600 mt-5">{error? error : ""}</p>
    </div>
  );
}
