const garden = document.getElementById('garden');
const clearBtn = document.getElementById('clearBtn');
const plantModeBtn = document.getElementById('plantModeBtn');

// Growth stages of plant
const growthStages = ['plant vsZombie ', '🌿🧟‍♀️', 'kiss👦🧌 ', '❤️‍🥕👩‍👦🧌❤️‍💋‍👨'];

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

  points -= 10; // 🔻 Deduct points to plant
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

  // 🌱 Click on individual plant to delete and gain 20 points
  plant.addEventListener('click', (e) => {
    e.stopPropagation();
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300);

    points += 20; // ✅ Add points back for individual delete
    updatePointsDisplay();
  });
}

// 🧹 Clear all plants (NO points awarded)
clearBtn.addEventListener('click', () => {
  const allPlants = document.querySelectorAll('.plant');
  allPlants.forEach((plant) => {
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300);
  });

  // ⚠️ No points added on bulk clear
  updatePointsDisplay();
});
