const workoutNameInput = document.getElementById('workoutName');
const repetitionsInput = document.getElementById('repetitions');
const setsInput = document.getElementById('sets');
const workoutPlanForm = document.getElementById('workout-plan-form');

// Populate input fields from localStorage on page load
workoutNameInput.value = localStorage.getItem('workoutName') || '';
repetitionsInput.value = localStorage.getItem('repetitions') || '';
setsInput.value = localStorage.getItem('sets') || '';

// Save input values to localStorage on form submission
workoutPlanForm.addEventListener('submit', () => {
    localStorage.setItem('workoutName', workoutNameInput.value);
    localStorage.setItem('repetitions', repetitionsInput.value);
    localStorage.setItem('sets', setsInput.value);
});
