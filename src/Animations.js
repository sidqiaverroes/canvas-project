import { FrameIndexPattern } from "./FrameIndexPattern";
import { WALK_DOWN } from "./objects/Hero/heroAnimations";

export class Animations {
    constructor(patterns) {
        this.patterns = patterns;
        this.activeKey = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    play(key, startAtTime = 0) {
        //already playing this on
        if(this.activeKey === key) {
            return;
        }
        //switch
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    step(delta) {
        this.patterns[this.activeKey].step(delta);
    }
}