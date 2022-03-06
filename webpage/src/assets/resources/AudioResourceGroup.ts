import AudioResource from './AudioResource';

class AudioResourceGroup {

    sounds: AudioResource[]

    constructor(sounds: AudioResource[]) {// pass in an array of AudioResources that are all similar
        this.sounds = sounds;
    }

    playRandom() {// play a random sound
        // only happen if it's defined
        if(this.sounds === undefined || this.sounds.length === 0)
            throw new Error(
                `There are no sounds: ${this.sounds}`
            );

        const r = floor(random(this.sounds.length));
        this.sounds[r].playRandom();// play a random sound from the array at a slightly randomized pitch, leading to the effect of it making a new sound each time, removing repetitiveness

    }

}

export = AudioResourceGroup;