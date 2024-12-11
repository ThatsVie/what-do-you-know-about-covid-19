import { useEffect } from 'react';

const InteractiveBubbles = () => {
  useEffect(() => {
    const bubbleContainer = document.querySelector('.interactive-bubbles');
    const header = document.querySelector('header');
    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorCircle);

    if (!bubbleContainer || !header) {
      console.error('Bubble container or header not found.');
      return;
    }

    // Function to create burst-like bubbles
    const createBurstBubbles = () => {
      const bubbleCount = 200;
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Randomize clustered starting position
        const clusterOffsetX = Math.random() * 60 - 30;
        const clusterOffsetY = Math.random() * 60 - 30;

        bubble.style.left = `calc(50% + ${clusterOffsetX}px)`;
        bubble.style.top = `calc(50% + ${clusterOffsetY}px)`;

        // Randomize size: extra small, small, and medium
        const sizeCategory = Math.random();
        let size;
        if (sizeCategory < 0.6) {
          size = 6; // Extra small (60% of the bubbles)
        } else if (sizeCategory < 0.9) {
          size = 15; // Small (30% of the bubbles)
        } else {
          size = 30; // Medium (10% of the bubbles)
        }

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Apply random opacity
        bubble.style.opacity = Math.random() * 0.5 + 0.5;

        // Randomize animation direction
        const directions = [
          'bubble-spread-up',
          'bubble-spread-down',
          'bubble-spread-left',
          'bubble-spread-right',
          'bubble-spread-diagonal-top-left',
          'bubble-spread-diagonal-bottom-left',
          'bubble-spread-diagonal-top-right',
          'bubble-spread-diagonal-bottom-right',
        ];
        const randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
        bubble.style.animationName = randomDirection;

        const duration = size === 6 ? 4 : size === 15 ? 6 : 8;
        const delay = Math.random() * 0.5;
        bubble.style.animation = `${randomDirection} ${duration}s linear ${delay}s forwards`;

        bubbleContainer.appendChild(bubble);

        bubble.addEventListener('animationend', () => bubble.remove());
      }
    };

    const burstInterval = setInterval(createBurstBubbles, 5000);
    createBurstBubbles();

    // Function to update cursor position and provide haptic feedback
    const updateCursorPosition = (x, y) => {
      cursorCircle.style.display = 'block';
      cursorCircle.style.left = `${x}px`;
      cursorCircle.style.top = `${y}px`;

      const bubbles = document.querySelectorAll('.bubble');
      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const distance = Math.sqrt(
          (rect.x + rect.width / 2 - x) ** 2 +
            (rect.y + rect.height / 2 - y) ** 2
        );

        if (distance < 50) {
          const currentSize = parseInt(bubble.style.width, 10);

          if (currentSize > 5) {
            bubble.style.width = `${currentSize / 2}px`;
            bubble.style.height = `${currentSize / 2}px`;
            bubble.style.transition =
              'width 0.2s ease-out, height 0.2s ease-out';

            // Add haptic feedback for mobile devices
            if (navigator.vibrate) navigator.vibrate(50); // Vibrate for 50ms
          } else {
            bubble.remove();
          }
        }
      });
    };

    // Mouse event handlers
    const handleMouseMove = (e) => {
      if (header.contains(e.target)) {
        updateCursorPosition(e.pageX, e.pageY);
      } else {
        cursorCircle.style.display = 'none';
      }
    };

    const handleMouseLeave = () => {
      cursorCircle.style.display = 'none';
    };

    // Touch event handlers
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (header.contains(touch.target)) {
        updateCursorPosition(touch.pageX, touch.pageY);
      } else {
        cursorCircle.style.display = 'none';
      }
    };

    const handleTouchEnd = () => {
      cursorCircle.style.display = 'none';
    };

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove);
    header.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      clearInterval(burstInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      header.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      cursorCircle.remove();
    };
  }, []);

  return null;
};

export default InteractiveBubbles;
