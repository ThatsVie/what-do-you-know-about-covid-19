import { useEffect } from "react";

const InteractiveBubbles = () => {
  useEffect(() => {
    const bubbleContainer = document.querySelector(".interactive-bubbles");
    const header = document.querySelector("header");
    const cursorCircle = document.createElement("div");
    cursorCircle.className = "cursor-circle";
    document.body.appendChild(cursorCircle);

    if (!bubbleContainer || !header) {
      console.error("Bubble container or header not found.");
      return;
    }

    // Function to create a burst of bubbles
    const createBubbleBurst = () => {
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = "0";
        bubble.style.animationDelay = `${Math.random() * 2}s`; // Random delay for burst effect
        bubbleContainer.appendChild(bubble);

        bubble.addEventListener("animationend", () => bubble.remove());
      }
    };

    // Start bursts every 5 seconds
    const burstInterval = setInterval(createBubbleBurst, 5000);
    createBubbleBurst(); // Trigger the first burst immediately

    // Cursor interaction logic (only in header)
    const handleMouseMove = (e) => {
      if (!header.contains(e.target)) {
        cursorCircle.style.display = "none";
        return;
      }

      cursorCircle.style.display = "block";
      cursorCircle.style.left = `${e.pageX}px`;
      cursorCircle.style.top = `${e.pageY}px`;

      const bubbles = document.querySelectorAll(".bubble");
      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const distance = Math.sqrt(
          (rect.x + rect.width / 2 - e.clientX) ** 2 +
            (rect.y + rect.height / 2 - e.clientY) ** 2
        );

        if (distance < 50) {
          bubble.style.opacity = "0"; // Fade out the bubble
          bubble.style.transition = "opacity 0.3s ease-out";
          setTimeout(() => bubble.remove(), 300); // Remove bubble after fade-out
        }
      });
    };

    const handleMouseLeave = () => {
      cursorCircle.style.display = "none"; // Hide the spotlight when the cursor leaves the header
    };

    document.addEventListener("mousemove", handleMouseMove);
    header.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(burstInterval);
      document.removeEventListener("mousemove", handleMouseMove);
      cursorCircle.remove();
    };
  }, []);

  return null;
};

export default InteractiveBubbles;
