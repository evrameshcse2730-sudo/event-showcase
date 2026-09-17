import { useEffect, useState } from "react";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import "./Admin.css";


function Admin() {

  // ================= AUTH =================

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const [loading, setLoading] = useState(true);


  // ================= EVENT =================

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const [adding, setAdding] = useState(false);


  // ================= CHECK LOGIN =================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

        if (currentUser) {
          loadEvents();
        }

      }
    );

    return () => unsubscribe();

  }, []);


  // ================= LOGIN =================

  async function handleLogin(e) {

    e.preventDefault();

    setLoginError("");

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    } catch (error) {

      console.error(error);

      setLoginError(
        "Invalid email or password."
      );

    }

  }


  // ================= LOGOUT =================

  async function handleLogout() {

    await signOut(auth);

    setEvents([]);

  }


  // ================= LOAD EVENTS =================

  async function loadEvents() {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "events")
        );

      const eventList =
        querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

      setEvents(eventList);

    } catch (error) {

      console.error(
        "Error loading events:",
        error
      );

    }

  }


  // ================= FORM CHANGE =================

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }


  // ================= ADD EVENT =================

  async function handleAddEvent(e) {

    e.preventDefault();

    setMessage("");
    setAdding(true);

    try {

      await addDoc(
        collection(db, "events"),
        {
          title: form.title,
          date: form.date,
          location: form.location,
          description: form.description,
          imageUrl: form.imageUrl,
          createdAt: serverTimestamp(),
        }
      );


      setMessage(
        "Event added successfully!"
      );


      // Clear form

      setForm({
        title: "",
        date: "",
        location: "",
        description: "",
        imageUrl: "",
      });


      // Reload events

      loadEvents();


    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to add event."
      );

    }

    setAdding(false);

  }


  // ================= DELETE EVENT =================

  async function handleDelete(id) {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteDoc(
        doc(db, "events", id)
      );

      setEvents(
        events.filter(
          (event) => event.id !== id
        )
      );

      setMessage(
        "Event deleted successfully!"
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to delete event."
      );

    }

  }


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="admin-login">

        <div className="login-box">

          <h2>
            Loading...
          </h2>

        </div>

      </div>
    );

  }


  // ================= LOGIN PAGE =================

  if (!user) {

    return (

      <div className="admin-login">

        <div className="login-box">

          <p className="login-label">
            EVENTSHOW
          </p>

          <h1>
            Admin Login
          </h1>

          <p className="login-description">
            Sign in to manage your events.
          </p>


          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />


            {loginError && (

              <p className="login-error">
                {loginError}
              </p>

            )}


            <button type="submit">
              Login
            </button>

          </form>


          <a
            href="/"
            className="back-home"
          >
            ← Back to website
          </a>

        </div>

      </div>

    );

  }


  // ================= DASHBOARD =================

  return (

    <div className="admin-page">

      {/* HEADER */}

      <header className="admin-header">

        <div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>
            Event Manager
          </h1>

        </div>


        <div className="admin-actions">

          <a href="/">
            View Website
          </a>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* DASHBOARD */}

      <main className="admin-dashboard">


        {/* USER */}

        <div className="welcome-card">

          <h2>
            Welcome 👋
          </h2>

          <p>
            Logged in as:
          </p>

          <strong>
            {user.email}
          </strong>

        </div>


        {/* ADD EVENT */}

        <div className="event-manager-grid">


          <section className="dashboard-card">

            <h2>
              Add New Event
            </h2>


            <form
              className="event-form"
              onSubmit={handleAddEvent}
            >

              <input
                type="text"
                name="title"
                placeholder="Event title"
                value={form.title}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="date"
                placeholder="Event date"
                value={form.date}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
              />


              <textarea
                name="description"
                placeholder="Event description"
                value={form.description}
                onChange={handleChange}
                required
              />


              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                required
              />


              <button
                type="submit"
                disabled={adding}
              >

                {adding
                  ? "Adding..."
                  : "Add Event"}

              </button>

            </form>


            {message && (

              <p className="admin-message">
                {message}
              </p>

            )}

          </section>


          {/* EVENT LIST */}

          <section className="dashboard-card">

            <div className="events-title">

              <h2>
                Events
              </h2>

              <span>
                {events.length}
              </span>

            </div>


            {events.length === 0 ? (

              <p className="empty-events">
                No events added yet.
              </p>

            ) : (

              <div className="admin-event-list">

                {events.map((event) => (

                  <div
                    className="admin-event"
                    key={event.id}
                  >

                    <div>

                      <h3>
                        {event.title}
                      </h3>

                      <p>
                        {event.date}
                      </p>

                      <p>
                        {event.location}
                      </p>

                    </div>


                    <button
                      onClick={() =>
                        handleDelete(event.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))}

              </div>

            )}

          </section>

        </div>

      </main>

    </div>

  );

}

export default Admin;