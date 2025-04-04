import React from "react";

const SaveAndLoad = ({ activities, setActivities, returnToMain }) => {
  const handleLocalSave = () => {
    if (activities.length === 0) {
      alert("No data available to save.");
      return;
    }
    localStorage.setItem("SafeHoursSave", JSON.stringify(activities));
    alert("Data saved locally as 'SafeHoursSave'.");
  };

  const handleLocalLoad = () => {
    const saved = localStorage.getItem("SafeHoursSave");
    if (!saved) {
      alert("No local save data found.");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error();
      setActivities(parsed);
      returnToMain();
    } catch (err) {
      alert("Saved data is corrupted or invalid.");
    }
  };

  const handleExportCSV = () => {
    if (activities.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = [
      "Date",
      "Start",
      "End",
      "Duration",
      "Pre/Post",
      "Activity",
      "Note",
    ];
    const csvRows = activities.map((a) =>
      [
        a.date,
        a.start,
        a.end,
        a.duration,
        a.prePost || "0",
        a.activity,
        a.note || "",
      ].join(",")
    );
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SafeHoursSave.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "tan",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "26px" }}></h2>

      <button
        onClick={handleLocalSave}
        style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}
      >
        Save to Local Storage
      </button>

      <button
        onClick={handleLocalLoad}
        style={{ ...buttonStyle, backgroundColor: "gray", color: "white" }}
      >
        Load from Local Storage
      </button>

      <button
        onClick={handleExportCSV}
        style={{
          ...buttonStyle,
          backgroundColor: "brown",
          color: "white",
        }}
      >
        Export as CSV Backup
      </button>

      <button
        onClick={returnToMain}
        style={{
          ...buttonStyle,
          backgroundColor: "#f0f0f0",
          color: "black",
        }}
      >
        Main Screen
      </button>
    </div>
  );
};

const buttonStyle = {
  width: "260px",
  height: "60px",
  margin: "10px",
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: "10px",
  border: "2px solid black",
  cursor: "pointer",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

export default SaveAndLoad;
