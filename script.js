
const garden = document.getElementById('garden');
const clearBtn = document.getElementById('clearBtn');
const plantModeBtn = document.getElementById('plantModeBtn');

// Growth stages of plant
const growthStages = ['🌱', '🌿', '🌸', '🌼'];

let plantMode = false;

// Toggle plant mode
plantModeBtn.addEventListener('click', () => {
  plantMode = !plantMode;
  plantModeBtn.textContent = `Plant Mode: ${plantMode ? 'ON' : 'OFF'}`;
  plantModeBtn.style.backgroundColor = plantMode ? '#388e3c' : '#66bb6a';
});

// Click on garden to plant seed
garden.addEventListener('click', (e) => {
  if (!plantMode) return;

  // Calculate position relative to garden
  const rect = garden.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  plantSeed(x, y);
});

// Plant seed at a given (x, y) position
function plantSeed(x, y) {
  const plant = document.createElement('div');
  plant.classList.add('plant');
  plant.textContent = growthStages[0];
  plant.style.left = `${x}px`;
  plant.style.top = `${y}px`;
  garden.appendChild(plant);

  let stage = 0;

  const growInterval = setInterval(() => {
    stage++;
    if (stage < growthStages.length) {
      plant.textContent = growthStages[stage];
    } else {
      clearInterval(growInterval);
    }
  }, 1500);

  // Remove plant on click
  plant.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent garden click
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300);
  });
}

// Clear all plants
clearBtn.addEventListener('click', () => {
  const allPlants = document.querySelectorAll('.plant');
  allPlants.forEach((plant) => {
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300);
  });
});
