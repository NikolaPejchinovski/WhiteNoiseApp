const noiseBoxes = document.querySelectorAll('.noiseBox');
const playBtn = document.getElementById('play');
const hoverMessage = document.querySelector('.hover-message');
const stopWatch = document.querySelector('.stopwatch-wrapper p:nth-child(2)');
const waveForm = document.querySelectorAll('.waveform span');
const volumeUp = document.getElementById('volume-up');
const volumeDown = document.getElementById('volume-down');
let hours = '00';
let minutes = '00';
let seconds = '00'; 
let tens = '00';

//Fetch random quote
randomQuote();

//This takes the noise name which also is the page name. It allows me to put everything in the same js file
let noiseToPlayId = location.pathname.substring(1, location.pathname.lastIndexOf('.'));
console.log(noiseToPlayId);
const noiseToPlay = document.getElementById(noiseToPlayId);

//Randomize waves on start
waveForm.forEach(wave => {
    wave.style.transform = `scaleY(${(Math.random() * 1 + 0.35)})`;
})

noiseBoxes.forEach((box) => {
    box.addEventListener('click', () => {
        window.open(`${box.id}.html`, '_blank');
    })
})

//Play Button
playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('active');
    const appendHours = document.getElementById("hours");
    const appendMins = document.getElementById('minutes');
    const appendTens = document.getElementById("tens");
    const appendSeconds = document.getElementById("seconds");
    var Interval ;
    if(playBtn.classList.contains('active')) {
        noiseToPlay.addEventListener('ended', () => {
            noiseToPlay.currentTime = 6;
            noiseToPlay.play();
        })
        noiseToPlay.currentTime = 3;
        noiseToPlay.play();

        //Stopwatch
        Interval = setInterval(startTimer, 10);
        
        
        
        function startTimer () {
            if (!playBtn.classList.contains('active')) {
                clearInterval(Interval);
                return; // Stop the timer if the play button is not active
            }
            tens++; 
            
            if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
            }
            
            if (tens > 9){
            appendTens.innerHTML = tens;
            
            } 
            
            if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
            }
            
            if (seconds > 9){
            appendSeconds.innerHTML = seconds;
            }

            if (seconds > 59){
                seconds = '00';
                appendSeconds.innerHTML = seconds;
                minutes++;
                appendMins.innerHTML = "0" + minutes;

            }

            if (minutes > 9) {
                appendMins.innerHTML = minutes;
            }

            if (minutes > 59) {
                minutes = '00';
                appendMins.innerHTML = minutes;
                hours++;
                appendHours.style.display = 'inline';
                appendHours.innerHTML = hours + ':';
            }
        
        }
    } else {
        noiseToPlay.pause();
        clearInterval(Interval);
        // tens = "00";
        // seconds = "00";
        // minutes = "00";
        // appendMins.innerHTML = minutes;
        // appendTens.innerHTML = tens;
        // appendSeconds.innerHTML = seconds;
    }


    waveForm.forEach((wave) => {
        const randomSign = [1, -1];
        let waveTime;
        function changeWave() {
            if(!playBtn.classList.contains('active')) {
                clearInterval(waveTime);
            }
            const scaleFactor = randomSign[Math.floor(Math.random() * 2)];
            wave.style.transform = `scaleY(${scaleFactor * (Math.random() * noiseToPlay.volume)})`;
        }

        waveTime = setInterval(changeWave, 100);
    })

})

//Stopwatch Hover Message
stopWatch.addEventListener('mouseover', () => {
    hoverMessage.classList.add('show');
})

stopWatch.addEventListener('mouseleave', () => {
    hoverMessage.classList.remove('show');
})


//Volume Control
volumeUp.addEventListener('click', () => {
    noiseToPlay.volume = noiseToPlay.volume + 0.1;
})

volumeDown.addEventListener('click', () => {
    noiseToPlay.volume = noiseToPlay.volume - 0.1;
})

//Get a random quote function
async function randomQuote() {
    const getQuote = document.querySelector('.quote');
    const config = {
        headers: {
            'X-Api-Key': 'hr87WHv7ChvcSOXhI9noAw==DVjMDsHLGVsXFcQH',
        },
        contentType: 'application/json',
    }
    
    const res = await axios.get('https://api.api-ninjas.com/v1/quotes?category=success', config);
    const quote = res.data[0].quote;
    console.log(quote);
    getQuote.innerHTML = `"${quote}"`;


}