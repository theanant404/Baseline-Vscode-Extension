/** @format */

// Test JavaScript file for browser support

// DOM manipulation
const element = document.querySelector("#test");
const elements = document.getElementsByClassName("test-class");
const button = document.getElementById("myButton");

// Event handling
button.addEventListener("click", function () {
  console.log("Button clicked!");
});

// Modern JavaScript APIs
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Local storage
localStorage.setItem("user", JSON.stringify({ name: "John" }));
const userData = localStorage.getItem("user");

// Async/await
async function fetchData() {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

// Web APIs
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Location:", position.coords);
  },
  (error) => {
    console.error("Location error:", error);
  }
);

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Element is visible");
    }
  });
});

// WebSocket
const socket = new WebSocket("wss://example.com/socket");

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then((registration) => {
    console.log("SW registered:", registration);
  });
}
