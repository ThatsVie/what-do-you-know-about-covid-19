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
      const bubbleCount = 100;
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Randomize clustered starting position
        const clusterOffsetX = Math.random() * 60 - 30; // Horizontal scatter (-30px to +30px)
        const clusterOffsetY = Math.random() * 60 - 30; // Vertical scatter (-30px to +30px)

        bubble.style.left = `calc(50% + ${clusterOffsetX}px)`; // Centralized burst origin
        bubble.style.top = `calc(50% + ${clusterOffsetY}px)`; // Centralized burst origin

        // Randomize size: extra small, small, and medium
        const sizeCategory = Math.random();
        let size;
        if (sizeCategory < 0.5)
          size = 6; // Extra small
        else if (sizeCategory < 0.8)
          size = 15; // Small
        else size = 20; // Medium (fewer medium-sized)

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Apply random opacity for germ-like particles
        bubble.style.opacity = Math.random() * 0.5 + 0.5; // Between 0.5 and 1

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

        // Apply animation properties with varied speeds
        const duration = size === 6 ? 2 : size === 15 ? 3 : 4; // Faster for smaller particles
        const delay = Math.random() * 0.5; // Slight stagger
        bubble.style.animation = `${randomDirection} ${duration}s linear ${delay}s forwards`;

        bubbleContainer.appendChild(bubble);

        // Remove bubble after animation ends
        bubble.addEventListener('animationend', () => bubble.remove());
      }
    };

    // Trigger bursts every 2 seconds
    const burstInterval = setInterval(createBurstBubbles, 5000);
    createBurstBubbles(); // Trigger the first burst immediately

    // Cursor interaction logic
    const handleMouseMove = (e) => {
      if (!header.contains(e.target)) {
        cursorCircle.style.display = 'none';
        return;
      }

      cursorCircle.style.display = 'block';
      cursorCircle.style.left = `${e.pageX}px`;
      cursorCircle.style.top = `${e.pageY}px`;

      const bubbles = document.querySelectorAll('.bubble');
      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const distance = Math.sqrt(
          (rect.x + rect.width / 2 - e.clientX) ** 2 +
            (rect.y + rect.height / 2 - e.clientY) ** 2
        );

        if (distance < 50) {
          const currentSize = parseInt(bubble.style.width, 10);

          if (currentSize > 5) {
            bubble.style.width = `${currentSize / 2}px`;
            bubble.style.height = `${currentSize / 2}px`;
            bubble.style.transition =
              'width 0.2s ease-out, height 0.2s ease-out';
          } else {
            bubble.remove(); // Remove bubble if it's too small
          }
        }
      });
    };

    const handleMouseLeave = () => {
      cursorCircle.style.display = 'none'; // Hide the spotlight when the cursor leaves the header
    };

    document.addEventListener('mousemove', handleMouseMove);
    header.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(burstInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      cursorCircle.remove();
    };
  }, []);

  return null;
};

export default InteractiveBubbles;
