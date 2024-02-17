document.addEventListener('DOMContentLoaded', function() {
    const timerInputSection = document.getElementById('timerInput');
    const setTimeButton = document.getElementById('set');
    const timerDisplaySection = document.getElementById('timerDisplay');
    const noTimerMessage = document.getElementById('noTimer');
    const audio = document.getElementById('audio');

    let timers = [];
//     document.getElementById('set').addEventListener('click', startTimer);

// function startTimer() {
//     const hours = parseInt(document.getElementById('hours').value) || 0;
//     const minutes = parseInt(document.getElementById('minutes').value) || 0;
//     const seconds = parseInt(document.getElementById('seconds').value) || 0;

//     const totalTime = hours * 3600 + minutes * 60 + seconds;

//     if (totalTime > 0) {
//         displayTimer(totalTime);
//     }
// }

    setTimeButton.addEventListener('click', function() {
        const hours = parseInt(document.getElementById('hh').value);
        const minutes = parseInt(document.getElementById('mm').value);
        const seconds = parseInt(document.getElementById('ss').value);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            alert('Please enter a valid time.');
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        const timer = {
            totalSeconds: totalSeconds,
            intervalId: setInterval(function() {
                timer.totalSeconds--;
                if (timer.totalSeconds <= 0) {
                    clearInterval(timer.intervalId);
                    Audio();
                    updateTimerDisplay();
                }
            }, 1000)
        };
        timers.push(timer);
        updateTimerDisplay();
    });

    function updateTimerDisplay() {
        timerDisplaySection.innerHTML = '';
        noTimerMessage.style.display = 'none';

        timers.forEach(function(timer, index) {
            const div = document.createElement('div');
            const p = document.createElement('p');
            const button = document.createElement('button');

            const hours = Math.floor(timer.totalSeconds / 3600);
            const minutes = Math.floor((timer.totalSeconds % 3600) / 60);
            const seconds = timer.totalSeconds % 60;

            p.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            button.textContent = 'Stop Timer';
            button.dataset.index = index;
            button.addEventListener('click', stopTimer);

            div.appendChild(p);
            div.appendChild(button);
            timerDisplaySection.appendChild(div);
        });

        if (timers.length === 0) {
            noTimerMessage.style.display = 'block';
        }
    }

    function stopTimer(event) {
        const index = parseInt(event.target.dataset.index);
        clearInterval(timers[index].intervalId);
        timers.splice(index, 1);
        updateTimerDisplay();
    }

    function Audio() {
        audio.currentTime = 0;
        audio.play();
    }
});
