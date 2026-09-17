import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================
     LOAD EVENTS FROM FIREBASE
  ========================= */

  useEffect(() => {
    async function loadEvents() {
      try {
        const snapshot = await getDocs(
          collection(db, "events")
        );

        const eventList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setEvents(eventList);

      } catch (err) {
        console.error("Error loading events:", err);

        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);


  return (
    <div className="site">


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar">

        <a href="#home" className="nav-logo">
          EVENT<span>SHOW</span>
        </a>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#events">
            Events
          </a>

          <a href="#contact">Contact</a>

        </div>


        <a
          href="#contact"
          className="nav-button"
        >
          Let's Talk
        </a>

      </nav>



      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="hero"
      >

        <div className="hero-content">

          <p className="eyebrow hero-eyebrow">
            EVENT EXPERIENCES
          </p>


          <h1>
            Moments
            <br />

            <span>
              worth
            </span>

            <br />

            remembering.
          </h1>


          <p className="hero-text">
            We create meaningful events,
            unforgettable experiences and
            moments that bring people together.
          </p>


          <div className="hero-actions">

            <a
              href="#events"
              className="primary-button"
            >
              Explore Events

              <span>
                ↗
              </span>
            </a>


            <a
              href="#about"
              className="secondary-button"
            >
              Discover More
            </a>

          </div>

        </div>



        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-circle">

            <div className="hero-circle-text">
              CREATE
              <br />
              CONNECT
              <br />
              CELEBRATE
            </div>

          </div>


          <div className="floating-card card-one">

            <strong>
              50+
            </strong>

            <span>
              Events
            </span>

          </div>


          <div className="floating-card card-two">

            <strong>
              10K+
            </strong>

            <span>
              People
            </span>

          </div>


          <div className="hero-small-circle">
            ↗
          </div>

        </div>


        <div className="scroll-indicator">

          <span></span>

          Scroll to explore

        </div>

      </section>



      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="about section"
      >

        <div className="section-number">
          01
        </div>


        <div className="about-left">

          <p className="eyebrow">
            WHO WE ARE
          </p>


          <h2>

            We turn

            <br />

            <span>
              events
            </span>

            into

            <br />

            experiences.

          </h2>

        </div>


        <div className="about-right">

          <p className="large-text">

            Every event has a story.
            Our job is to make that
            story unforgettable.

          </p>


          <p>

            From professional gatherings and
            corporate experiences to seminars
            and networking events, we bring
            together people, creativity and
            thoughtful execution.

          </p>


          <p>

            We focus on creating experiences
            that people remember long after
            the event ends.

          </p>


          <a
            href="#services"
            className="text-link"
          >
            Discover what we do →
          </a>

        </div>

      </section>



      {/* =====================================================
          EVENT TYPES / SERVICES
      ===================================================== */}

      <section
        id="services"
        className="event-types section"
      >

        <div className="event-types-header">

          <div>

            <p className="eyebrow">
              02 — WHAT WE DO
            </p>


            <h2>

              Events we

              <br />

              <span>
                create.
              </span>

            </h2>

          </div>


          <p>

            From professional conferences to
            meaningful networking experiences,
            we create events around people,
            purpose and connection.

          </p>

        </div>



        <div className="event-types-grid">


          {/* TYPE 01 */}

          <div className="event-type">

            <span>
              01
            </span>


            <h3>
              Conferences
            </h3>


            <p>

              Professional conferences designed
              to bring industry leaders, professionals
              and audiences together.

            </p>


            <div className="event-arrow">
              ↗
            </div>

          </div>



          {/* TYPE 02 */}

          <div className="event-type">

            <span>
              02
            </span>


            <h3>
              Seminars
            </h3>


            <p>

              Engaging seminars and knowledge
              sessions focused on learning,
              ideas and meaningful conversations.

            </p>


            <div className="event-arrow">
              ↗
            </div>

          </div>



          {/* TYPE 03 */}

          <div className="event-type">

            <span>
              03
            </span>


            <h3>
              Corporate Events
            </h3>


            <p>

              Corporate gatherings, team events
              and professional experiences built
              around organizational goals.

            </p>


            <div className="event-arrow">
              ↗
            </div>

          </div>



          {/* TYPE 04 */}

          <div className="event-type">

            <span>
              04
            </span>


            <h3>
              Networking Events
            </h3>


            <p>

              Curated networking experiences
              that help professionals build
              valuable connections.

            </p>


            <div className="event-arrow">
              ↗
            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section
        id="events"
        className="events section"
      >

        <div className="events-header">

          <div>

            <p className="eyebrow">
              03 — OUR WORK
            </p>


            <h2>

              Recent

              <br />

              <span>
                Events.
              </span>

            </h2>

          </div>


          <p>

            A collection of events,
            experiences and memories
            created by our team.

          </p>

        </div>



        {/* LOADING */}

        {loading && (

          <div className="events-status">

            Loading events...

          </div>

        )}



        {/* ERROR */}

        {error && (

          <div className="events-status error">

            {error}

          </div>

        )}



        {/* NO EVENTS */}

        {!loading &&
          !error &&
          events.length === 0 && (

            <div className="events-status">

              No events available yet.

            </div>

          )}



        {/* FIREBASE EVENTS */}

        {!loading &&
          !error &&
          events.length > 0 && (

            <div className="events-grid">

              {events.map((event, index) => (

                <article
                  className={`event-card event-card-${index + 1}`}
                  key={event.id}
                >


                  <div className="event-image">

                    <img
                      src={event.imageUrl}
                      alt={event.title}
                    />


                    <div className="event-overlay">

                      <span>
                        View Event ↗
                      </span>

                    </div>

                  </div>



                  <div className="event-info">

                    <div>

                      <p className="event-date">

                        {event.date}

                      </p>


                      <h3>

                        {event.title}

                      </h3>

                    </div>


                    <p className="event-location">

                      {event.location}

                    </p>

                  </div>


                  <p className="event-description">

                    {event.description}

                  </p>


                </article>

              ))}

            </div>

          )}

      </section>



      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="stats">


        <div className="stat">

          <strong>
            50+
          </strong>

          <span>
            Events Conducted
          </span>

        </div>


        <div className="stat">

          <strong>
            10K+
          </strong>

          <span>
            People Reached
          </span>

        </div>


        <div className="stat">

          <strong>
            25+
          </strong>

          <span>
            Locations
          </span>

        </div>


        <div className="stat">

          <strong>
            100%
          </strong>

          <span>
            Commitment
          </span>

        </div>

      </section>



      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section
        className="experience section"
      >

        <div className="experience-header">

          <p className="eyebrow">
            04 — THE EXPERIENCE
          </p>


          <h2>

            More than an event.

            <br />

            <span>
              It's a feeling.
            </span>

          </h2>

        </div>



        <div className="experience-grid">


          <div className="experience-item">

            <span>
              01
            </span>

            <h3>
              People
            </h3>

            <p>

              Bringing the right people together
              to create meaningful connections.

            </p>

          </div>



          <div className="experience-item">

            <span>
              02
            </span>

            <h3>
              Creativity
            </h3>

            <p>

              Fresh ideas and thoughtful details
              that make every event unique.

            </p>

          </div>



          <div className="experience-item">

            <span>
              03
            </span>

            <h3>
              Execution
            </h3>

            <p>

              Seamless planning and execution
              from beginning to end.

            </p>

          </div>



          <div className="experience-item">

            <span>
              04
            </span>

            <h3>
              Memories
            </h3>

            <p>

              Creating moments people remember
              long after the event ends.

            </p>

          </div>

        </div>

      </section>



      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <section className="marquee">

        <div className="marquee-track">

          <span>
            CREATE
          </span>

          <span>
            CONNECT
          </span>

          <span>
            CELEBRATE
          </span>

          <span>
            CREATE
          </span>

          <span>
            CONNECT
          </span>

          <span>
            CELEBRATE
          </span>

        </div>

      </section>



      {/* =====================================================
          CTA
      ===================================================== */}
<section id="contact" className="contact section">
  <div className="section-number">05</div>

  <div className="contact-content">

    <div className="contact-left">
      <p className="eyebrow">05 — CONTACT</p>

      <h2>
        Let's create
        <br />
        something <span>memorable.</span>
      </h2>

      <p className="contact-text">
        Have an event in mind?
        Let's talk about your idea and
        create an experience people remember.
      </p>
    </div>

    <div className="contact-right">

    <a
  href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20event%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-button"
>
  <span>WhatsApp Us</span>
  <b>↗</b>
</a>

      <div className="contact-item">
        <span>Email</span>
        <strong>hello@example.com</strong>
      </div>

      <div className="contact-item">
        <span>Location</span>
        <strong>Hyderabad, India</strong>
      </div>

    </div>

  </div>
</section>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="contact"
        className="footer"
      >

        <div className="footer-top">


          <div>

            <div className="footer-logo">

              EVENT<span>SHOW</span>

            </div>


            <p>
              Creating memorable experiences.
            </p>

          </div>



          <div className="footer-links">

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#events">
              Events
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 EventShow. All rights reserved.
          </p>


          <a href="#home">
            Back to top ↑
          </a>

        </div>

      </footer>

    </div>
  );
}

export default Home;