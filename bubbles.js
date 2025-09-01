// Sistema de bolhas animadas para AquaSite
(function() {
  function createBubbles() {
    const container = document.createElement('div');
    container.className = 'bubbles-container';
    document.body.appendChild(container);

    function createBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const size = Math.random() * 60 + 15;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      
      const duration = Math.random() * 10 + 6;
      bubble.style.animationDuration = duration + 's';
      
      container.appendChild(bubble);
      
      setTimeout(() => {
        if (bubble.parentNode) {
          bubble.remove();
        }
      }, duration * 1000);
    }

    function generateBubbles() {
      createBubble();
      setTimeout(generateBubbles, Math.random() * 1000 + 300);
    }

    generateBubbles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBubbles);
  } else {
    createBubbles();
  }
  
  setTimeout(createBubbles, 100);
})();