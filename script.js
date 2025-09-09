const plantBtn = document.getElementById('plantBtn');
const garden = document.getElementById('garden');

// Plant growth stages
const growthStages = ['🌱', '🌿', '🌸', '🌼'];

plantBtn.addEventListener('click', () => {
  const plant = document.createElement('div');
  plant.classList.add('plant');
  plant.textContent = growthStages[0]; // Start as seedling
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

  // Click to remove the plant
  plant.addEventListener('click', () => {
    plant.classList.add('remove');
    setTimeout(() => {
      plant.remove();
    }, 300); // Match the CSS transition time
  });
});
