import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD EVENTS FROM FIREBASE
  ===================================================== */

  useEffect(() => {
    async function loadEvents() {
      try {
        const snapshot = await getDocs(collection(db, "events"));

        const eventList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setEvents(eventList);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  /* =====================================================
     FIXED EVENT TYPES
  ===================================================== */

  const eventTypes = [
    {
      number: "01",
      title: "Conferences",
      description:
        "Professional conferences designed to connect ideas, people and opportunities.",
      icon: "✦",
    },
    {
      number: "02",
      title: "Seminars",
      description:
        "Focused sessions that bring experts and audiences together around meaningful ideas.",
      icon: "◈",
    },
    {
      number: "03",
      title: "Corporate Events",
      description:
        "Sophisticated corporate experiences built around your brand and business goals.",
      icon: "◇",
    },
    {
      number: "04",
      title: "Networking Events",
      description:
        "Curated environments where meaningful professional connections can happen.",
      icon: "○",
    },
  ];

  /* =====================================================
     WHATSAPP
  ===================================================== */

  const whatsappNumber = "919999999999";

  const whatsappMessage = encodeURIComponent(
    "Hi, I would like to know more about your event services."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="page">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="luxury-navbar">

        <a href="#home" className="luxury-logo">
          EVENT<span>SHOW</span>
        </a>

        <div className="luxury-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="#contact" className="luxury-nav-button">
          Let's Talk
          <span>↗</span>
        </a>

      </nav>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-eyebrow">
            EVENTS • EXPERIENCES • CONNECTIONS
          </div>

          <h1 className="hero-title">
            Where Great
            <br />
            <span className="gold-text">Events Begin.</span>
          </h1>

          <p className="hero-description">
            We create memorable event experiences that bring people,
            ideas and opportunities together.
          </p>

          <div className="hero-actions">

            <a href="#events" className="primary-btn">
              Explore Events
              <b>↗</b>
            </a>

            <a href="#contact" className="secondary-btn">
              Plan Your Event
            </a>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-orb">

            <div className="orbit orbit-one">
              <span></span>
            </div>

            <div className="orbit orbit-two">
              <span></span>
            </div>

            <div className="orbit orbit-three">
              <span></span>
            </div>

            <div className="orb-core">
              <span>EVENT</span>
              <strong>360°</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="about-section" id="about">

        <div className="section-label">
          ABOUT US
        </div>

        <div className="about-grid">

          <div className="about-heading">

            <h2>
              Creating moments
              <br />
              <span className="gold-text">
                worth remembering.
              </span>
            </h2>

          </div>

          <div className="about-content">

            <p>
              Every event has a purpose. We transform that purpose
              into an experience that people remember.
            </p>

            <p>
              From professional conferences and seminars to corporate
              gatherings and networking experiences, we bring together
              creativity, planning and execution.
            </p>

            <a href="#contact" className="text-link">
              Discover Our Approach
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* =================================================
          EVENT TYPES
      ================================================= */}

      <section className="events-section" id="services">

        <div className="section-heading">

          <div>
            <div className="section-label">
              WHAT WE DO
            </div>

            <h2>
              Events with
              <br />
              <span className="gold-text">purpose.</span>
            </h2>
          </div>

          <p>
            Designed for businesses, professionals and communities
            that want more than just an event.
          </p>

        </div>


        <div className="event-types-grid">

          {eventTypes.map((event) => (

            <div
              className="event-card"
              key={event.number}
            >

              <div className="event-card-top">

                <span className="event-number">
                  {event.number}
                </span>

                <span className="event-icon">
                  {event.icon}
                </span>

              </div>

              <div className="event-card-content">

                <h3>{event.title}</h3>

                <p>{event.description}</p>

                <a href="#contact">
                  Know More
                  <span>↗</span>
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =================================================
          RECENT EVENTS - FIREBASE
      ================================================= */}

      <section className="recent-events-section" id="events">

        <div className="section-heading">

          <div>

            <div className="section-label">
              OUR EVENTS
            </div>

            <h2>
              Recent
              <br />
              <span className="gold-text">
                experiences.
              </span>
            </h2>

          </div>

          <p>
            Explore events and experiences added by our team.
          </p>

        </div>


        {loading ? (

          <div className="events-loading">
            <span></span>
            Loading events...
          </div>

        ) : events.length === 0 ? (

          <div className="events-empty">
            <div className="empty-icon">✦</div>

            <h3>No events yet</h3>

            <p>
              New experiences will appear here soon.
            </p>
          </div>

        ) : (

          <div className="recent-events-grid">

            {events.map((event) => (

              <article
                className="recent-event-card event-card"
                key={event.id}
              >

                <div className="recent-event-image">

                  {event.imageUrl ? (

                    <img
                      src={event.imageUrl}
                      alt={event.title || "Event"}
                    />

                  ) : (

                    <div className="image-placeholder">
                      <span>EVENT</span>
                    </div>

                  )}

                  <div className="image-overlay">
                    <span>VIEW EVENT</span>
                  </div>

                </div>


                <div className="recent-event-info">

                  <div className="event-meta">

                    <span>
                      {event.date || "Upcoming"}
                    </span>

                    {event.location && (
                      <>
                        <i>•</i>
                        <span>{event.location}</span>
                      </>
                    )}

                  </div>

                  <h3>
                    {event.title || "Event"}
                  </h3>

                  {event.description && (
                    <p>
                      {event.description}
                    </p>
                  )}

                  <a href="#contact">
                    Event Details
                    <span>↗</span>
                  </a>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-section">

        <div className="stats-grid">

          <div className="stat-item">

            <strong>50+</strong>

            <span>
              Events
            </span>

          </div>


          <div className="stat-item">

            <strong>10K+</strong>

            <span>
              Attendees
            </span>

          </div>


          <div className="stat-item">

            <strong>25+</strong>

            <span>
              Brands
            </span>

          </div>


          <div className="stat-item">

            <strong>100%</strong>

            <span>
              Experience
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <section className="experience-section">

        <div className="experience-grid">

          <div className="experience-number">
            01
          </div>

          <div className="experience-content">

            <div className="section-label">
              THE EXPERIENCE
            </div>

            <h2>
              From first idea
              <br />
              to final applause.
            </h2>

            <p>
              We believe successful events are created long before
              the audience arrives. Planning, creativity, coordination
              and execution come together to create a seamless experience.
            </p>

            <div className="experience-points">

              <div>
                <span>01</span>
                <strong>Planning</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Creative Direction</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Event Execution</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          MARQUEE
      ================================================= */}

      <section className="marquee-section">

        <div className="marquee-track">

          <span>CONFERENCES</span>
          <i>✦</i>

          <span>SEMINARS</span>
          <i>✦</i>

          <span>CORPORATE EVENTS</span>
          <i>✦</i>

          <span>NETWORKING</span>
          <i>✦</i>

          <span>CONFERENCES</span>
          <i>✦</i>

          <span>SEMINARS</span>
          <i>✦</i>

          <span>CORPORATE EVENTS</span>
          <i>✦</i>

          <span>NETWORKING</span>
          <i>✦</i>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="cta-section">

        <div className="cta-inner">

          <div className="section-label">
            LET'S CREATE
          </div>

          <h2>
            Your next event
            <br />
            <span className="gold-text">
              starts here.
            </span>
          </h2>

          <p>
            Tell us what you are planning.
            Let's turn it into an experience.
          </p>

          <div className="cta-actions">

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              <span>WhatsApp Us</span>
              <b>↗</b>
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              Contact Us
            </a>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTACT
      ================================================= */}

      <section className="contact-section" id="contact">

        <div className="contact-grid">

          <div className="contact-info">

            <div className="section-label">
              GET IN TOUCH
            </div>

            <h2>
              Let's talk about
              <br />
              <span className="gold-text">
                your event.
              </span>
            </h2>

            <p>
              Have an event in mind?
              Reach out and let's start planning.
            </p>


            <div className="contact-details">

              <div>
                <span>EMAIL</span>
                <a href="mailto:hello@example.com">
                  hello@example.com
                </a>
              </div>

              <div>
                <span>PHONE</span>
                <a href="tel:+919999999999">
                  +91 99999 99999
                </a>
              </div>

              <div>
                <span>LOCATION</span>
                <p>Hyderabad, India</p>
              </div>

            </div>

          </div>


          <div className="contact-form-wrapper">

            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="form-group">

                <label>Your Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                />

              </div>


              <div className="form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>


              <div className="form-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                />

              </div>


              <div className="form-group">

                <label>Tell us about your event</label>

                <textarea
                  rows="5"
                  placeholder="What are you planning?"
                ></textarea>

              </div>


              <button type="submit" className="primary-btn">

                Send Enquiry

                <b>↗</b>

              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footer-top">

          <a href="#home" className="luxury-logo">
            EVENT<span>SHOW</span>
          </a>

          <p>
            Creating experiences.
            Connecting people.
          </p>

          <a href="#home" className="back-top">
            Back to top ↑
          </a>

        </div>


        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} EventShow.
            All rights reserved.
          </span>

          <span>
            Hyderabad, India
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;