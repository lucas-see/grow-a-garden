const garden = document.getElementById('garden');
const clearBtn = document.getElementById('clearBtn');
const plantModeBtn = document.getElementById('plantModeBtn');

// Growth stages of plant
const growthStages = ['plant vsZombie ', '🌿🧟‍♀️', 'kiss👦🧌 ', '❤️‍🥕👩‍👦🧌❤️‍💋‍👨'];
const stagePoints = [5, 10, 15, 20];

let plantMode = false;

// 💰 Points system
let points = 20;
const pointDisplay = document.createElement('div');
pointDisplay.id = 'pointDisplay';
pointDisplay.style.position = 'fixed';
pointDisplay.style.top = '10px';
pointDisplay.style.right = '10px';
pointDisplay.style.padding = '10px';
pointDisplay.style.backgroundColor = '#fff';
pointDisplay.style.border = '1px solid #ccc';
pointDisplay.style.borderRadius = '5px';
pointDisplay.style.fontSize = '16px';
pointDisplay.style.fontFamily = 'monospace';
document.body.appendChild(pointDisplay);

function updatePointsDisplay() {
  pointDisplay.textContent = `Points: ${points}`;
}

updatePointsDisplay();

// Toggle plant mode
plantModeBtn.addEventListener('click', () => {
  plantMode = !plantMode;
  plantModeBtn.textContent = `Plant Mode: ${plantMode ? 'ON' : 'OFF'}`;
  plantModeBtn.style.backgroundColor = plantMode ? '#388e3c' : '#66bb6a';
});

// Click on garden to plant seed
garden.addEventListener('click', (e) => {
  if (!plantMode) return;

  if (points < 10) {
    alert("Not enough points to plant! You need 10.");
    return;
  }

  const rect = garden.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  points -= 10;
  updatePointsDisplay();

  plantSeed(x, y);
});

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

  // Keep updating the stage
  plant.dataset.stage = stage;

  const stageUpdater = setInterval(() => {
    if (stage < growthStages.length) {
      plant.dataset.stage = stage;
    } else {
      clearInterval(stageUpdater);
    }
  }, 1500);

  // Delete plant on click and gain points based on stage
  plant.addEventListener('click', (e) => {
    e.stopPropagation();
    plant.classList.add('remove');

    setTimeout(() => {
      const currentStage = parseInt(plant.dataset.stage || '0');
      const earnedPoints = stagePoints[Math.min(currentStage, stagePoints.length - 1)];
      points += earnedPoints;
      updatePointsDisplay();
      plant.remove();
    }, 300);
  });
}

// Clear all plants (NO points awarded)
clearBtn.addEventListener('click', () => {
  const allPlants = document.querySelectorAll('.plant');
  allPlants.forEach((plant) => {
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300);
  });

  updatePointsDisplay(); // No points added
});


// 🕹️ Keyboard cheat code: "iddqd" → 1M points
let cheatBuffer = '';

document.addEventListener('keydown', (e) => {
  cheatBuffer += e.key.toLowerCase();

  if (cheatBuffer.length > 10) {
    cheatBuffer = cheatBuffer.slice(-10);
  }

  if (cheatBuffer.includes('iddqd')) {
    points = 1000000;
    updatePointsDisplay();
    alert('Cheat activated! 💰 You now have 1,000,000 points.');
    cheatBuffer = '';
  }
});

// 🖱️ Cheat button + input box logic
const cheatBtn = document.getElementById('cheatBtn');
const cheatInput = document.getElementById('cheatInput');

cheatBtn.addEventListener('click', () => {
  cheatInput.style.display = cheatInput.style.display === 'none' ? 'inline-block' : 'none';
  if (cheatInput.style.display !== 'none') {
    cheatInput.focus();
  }
});

cheatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const code = cheatInput.value.trim().toLowerCase();

    if (code === 'iddqd') {
      points = 1000000;
      updatePointsDisplay();
      alert('Cheat activated! 💰 You now have 1,000,000 points.');
    } else {
      alert('Invalid cheat code ❌');
    }

    cheatInput.value = '';
    cheatInput.style.display = 'none';
  }
});
// 🪣 Collect All Plants and gain points
const collectBtn = document.getElementById('collectBtn');

collectBtn.addEventListener('click', () => {
  const allPlants = document.querySelectorAll('.plant');
  let totalCollected = 0;

  allPlants.forEach((plant) => {
    const currentStage = parseInt(plant.dataset.stage || '0');
    const earned = stagePoints[Math.min(currentStage, stagePoints.length - 1)];
    totalCollected += earned;

    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
      updatePointsDisplay();
    }, 300);
  });

  if (allPlants.length > 0) {
    points += totalCollected;
    updatePointsDisplay();
    alert(`🪴 Collected ${allPlants.length} plants and earned ${totalCollected} points!`);
  } else {
    alert('🌾 There are no plants to collect.');
  }
});

