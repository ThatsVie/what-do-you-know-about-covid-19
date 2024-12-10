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
        const clusterOffsetX = Math.random() * 60 - 30;
        const clusterOffsetY = Math.random() * 60 - 30;

        bubble.style.left = `calc(50% + ${clusterOffsetX}px)`;
        bubble.style.top = `calc(50% + ${clusterOffsetY}px)`;

        // Randomize size: extra small, small, and medium
        const sizeCategory = Math.random();
        let size;
        if (sizeCategory < 0.5) size = 6;
        else if (sizeCategory < 0.8) size = 15;
        else size = 20;

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

        const duration = size === 6 ? 2 : size === 15 ? 3 : 4;
        const delay = Math.random() * 0.5;
        bubble.style.animation = `${randomDirection} ${duration}s linear ${delay}s forwards`;

        bubbleContainer.appendChild(bubble);

        bubble.addEventListener('animationend', () => bubble.remove());
      }
    };

    const burstInterval = setInterval(createBurstBubbles, 5000);
    createBurstBubbles();

    // Cursor interaction logic
    const handleMouseMove = (e) => {
      if (header.contains(e.target)) {
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
              bubble.remove();
            }
          }
        });
      } else {
        cursorCircle.style.display = 'none';
      }
    };

    const handleMouseLeave = () => {
      cursorCircle.style.display = 'none';
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
