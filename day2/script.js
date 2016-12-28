const secondHand = document.querySelector('#second-hand');
const minuteHand = document.querySelector('#minute-hand');
const hourHand = document.querySelector('#hour-hand');
const body = document.getElementsByTagName("html")[0];

function setTime() {
    const ANGLE_OFFSET = 90;
    const currentTime = new Date();

    const seconds = currentTime.getSeconds();
    const minutes = currentTime.getMinutes();
    const hours = currentTime.getHours();

    setBackground(hours);

    const secondsDegrees = ((seconds/60)*360)+ANGLE_OFFSET;
    const minutesDegrees = ((minutes/60)*360)+ANGLE_OFFSET;
    const hoursDegrees = ((hours%12+(minutes/60))/12*360)+ANGLE_OFFSET;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function setBackground(hours) {
    if (hours > 22 || hours < 5) {
        body.style.background = "linear-gradient(to bottom, #45484d 0%,#2b2b2b 100%)";
    } else if (hours >= 8 && hours < 17) {
        body.style.background = "linear-gradient(to bottom, rgba(0,238,255,1) 0%, rgba(0,112,173,1) 100%)";
    } else if (hours >= 17 || hours < 8) {
        body.style.background = "linear-gradient(to bottom, rgba(64,64,255,1) 0%, rgba(0,38,133,1) 100%)";
    }
}

setInterval(setTime, 1000);