// script.js - Loading sequence and music implementation

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const loader = document.querySelector('.Loader');
  const loadLogo = document.getElementById('load_logo');
  const loadBar = document.querySelector('.load_bar');
  const loadBarInner = document.getElementById('load_bar_inner');
  const loadText = document.getElementById('load_text');
  const selection = document.querySelector('.Selection');
  const music = document.querySelector('.Music');
  
  // Initially hide elements
  loadLogo.style.opacity = '0';
  loadBar.style.opacity = '0';
  loadBarInner.style.width = '0';
  loadText.textContent = 'initializing...';
  
  // Staggered loading animation
  setTimeout(() => {
    // Fade in logo first
    loadLogo.style.transition = 'opacity 0.8s ease-in-out';
    loadLogo.style.opacity = '1';
    loadText.textContent = 'loading assets...';
    
    // After logo appears, show the loading bar
    setTimeout(() => {
      loadBar.style.transition = 'opacity 0.5s ease-in-out';
      loadBar.style.opacity = '1';
      loadText.textContent = 'loading...';
      
      // Begin filling the loading bar
      setTimeout(() => {
        loadBarInner.style.transition = 'width 3s ease-in-out';
        loadBarInner.style.width = '94%';
        
        // When loading is complete
        setTimeout(() => {
          loadText.textContent = 'complete';
          
          // Fade out loader
          setTimeout(() => {
            loader.style.transition = 'opacity 1s ease-in-out';
            loader.style.opacity = '0';
            
            // Show selection menu and play music
            setTimeout(() => {
              loader.style.display = 'none';
              selection.style.display = 'block';
              selection.style.opacity = '0';
              
              // Fade in selection menu
              setTimeout(() => {
                selection.style.transition = 'opacity 1s ease-in-out';
                selection.style.opacity = '1';
                
                // Play music (if available)
                if (music && music.querySelector('source').src) {
                  try {
                    music.volume = 0.5; // Start at half volume
                    
                    // Gradually increase volume
                    let vol = 0;
                    const volumeInterval = setInterval(() => {
                      vol += 0.1;
                      if (vol >= 0.5) {
                        clearInterval(volumeInterval);
                      } else {
                        music.volume = vol;
                      }
                    }, 200);
                    
                    music.play().catch(error => {
                      console.log('Audio playback prevented by browser. User interaction required.');
                    });
                  } catch (e) {
                    console.log('Audio playback error:', e);
                  }
                }
              }, 100);
            }, 1000);
          }, 500);
        }, 3500); // Time after loading bar is full
      }, 500); // Time before loading bar starts filling
    }, 800); // Time after logo appears
  }, 500); // Initial delay
  
  // Add interaction to menu items
  const menuItems = document.querySelectorAll('.selectmenu li:not(.disabled)');
  const infoText = document.getElementById('select_info');
  
  menuItems.forEach(item => {
    // Show character info on hover
    item.addEventListener('mouseenter', function() {
      const characterName = this.querySelector('a').textContent;
      infoText.textContent = `Select ${characterName}`;
      infoText.style.opacity = '1';
    });
    
    // Clear info text when not hovering
    item.addEventListener('mouseleave', function() {
      infoText.style.opacity = '0';
    });
    
    // Add click sound effect
    item.addEventListener('click', function() {
      // Optional: Add click sound effect
      const clickSound = new Audio('preloads/click.mp3'); // Create your own click sound
      clickSound.volume = 0.3;
      clickSound.play().catch(e => console.log('Click sound prevented'));
    });
  });
  
  // Audio controls (add a mute button if needed)
  document.addEventListener('keydown', function(e) {
    // Press 'M' to mute/unmute
    if (e.key.toLowerCase() === 'm' && music) {
      if (music.muted) {
        music.muted = false;
      } else {
        music.muted = true;
      }
    }
  });
});
