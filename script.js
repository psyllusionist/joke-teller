const button = document.getElementById('button')
const audioElement = document.getElementById('audio');

// Disable/Enable Button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API 
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: '48eb02bd219d47b1ae9bd7a7628a285b',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke APi
const getJokes = async () => {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist,explicit'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let joke = data.joke || data.setup + " ... " + data.delivery;
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch(error) {
        //Catch Errors Here
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);