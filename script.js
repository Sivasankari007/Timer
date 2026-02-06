document.addEventListener('DOMContentLoaded', () => {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const targetInput = document.getElementById('target-date');
    const setBtn = document.getElementById('set-date-btn');

    // Set default target date: 30 days from now
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    // Set input value to current target date
    const isoString = targetDate.toISOString().slice(0, 16);
    targetInput.value = isoString;

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Time's up
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            document.querySelector('.title').innerText = "Event Started!";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.innerText = d.toString().padStart(2, '0');
        hoursEl.innerText = h.toString().padStart(2, '0');
        minutesEl.innerText = m.toString().padStart(2, '0');
        secondsEl.innerText = s.toString().padStart(2, '0');
    }

    // Initial call
    updateCountdown();
    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    setBtn.addEventListener('click', () => {
        const newDate = new Date(targetInput.value);
        if (!isNaN(newDate.getTime())) {
            targetDate = newDate;
            document.querySelector('.title').innerText = "Coming Soon";
            updateCountdown();
        } else {
            alert("Please select a valid date and time.");
        }
    });
});
