import { useState } from "react";

const App = () => {
  const sections = ["VIP", "Gold", "Silver"];

  const initialSeats = {
    VIP: Array(10).fill(false),
    Gold: Array(20).fill(false),
    Silver: Array(30).fill(false),
  };

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  const handleSeatSelection = (section, index) => {
    if (!seats[section][index]) {
      setSelectedSeats([...selectedSeats, { section, index }]);
      console.log(selectedSeats);
      setSeats({
        ...seats,
        [section]: seats[section].map((seat, i) => (i === index ? true : seat)),
      });
    } else {
      alert("Seat already selected!");
    }
  };

  const confirmBooking = () => {
    if (selectedSeats.length > 0) {
      setConfirmation(true);
    } else {
      alert("Please select at least one seat!");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Diljit Concert Booking</h1>
      <div>
        {sections.map((section) => (
          <div key={section} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section} Section</h2>
            <div style={styles.grid}>
              {seats[section].map((isBooked, index) => (
                <button
                  key={index}
                  style={styles.seat(isBooked)}
                  onClick={() => handleSeatSelection(section, index)}
                  disabled={isBooked}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button style={styles.button} onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>

      {confirmation && (
        <div style={styles.confirmation}>
          <h2>Booking Confirmed!</h2>
          <p>You have booked the followed seats: </p>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Section: {seat.section}, Seat: {seat.index + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Poppins",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  section: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  seat: (isBooked) => ({
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: isBooked ? "#e3342f" : "#38c172",
    color: "#fff",
    textAlign: "center",
    cursor: isBooked ? "not-allowed" : "pointer",
  }),
  button: {
    padding: "10px 20px",
    backgroundColor: "#3490dc",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "600",
    cursor: "pointer",
  },
  confirmation: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e6fffa",
    border: "1px solid #38c172",
    borderRadius: "8px",
    color: "#2f855a",
  },
};

export default App;
