
const
    splashText = writable(undefined);

export { splashText }

// TODO: page checking and controlling

import { writable } from "svelte/store";

const
    scrollPos = writable(0),
    screenSize = writable(0),
    screenType = writable(0),
    bandWidths = [850, 650, 450]; //pre-determined bandwidth sizes

export { scrollPos, screenSize, bandWidths, screenType };

// TODO: Internal device management & specific code application instances.

const deviceType = writable(undefined);

export { deviceType };

// TODO: Internal directory and status management

const
    directory =   writable("/"),
    rootPath =    writable("/");
const
    pageLoaded =  writable(false),
    transitioning = writable(false);

export { directory, rootPath, pageLoaded, transitioning };

import { navigationDirectories } from "$lib/controllers/navigationDirectories.js";

// TODO: navigation direction controller

const
    urlStoreArr =   writable([""]), // handles the transition direction
    direction =    writable([0,0]); // handles the transition direction

export { urlStoreArr, direction }

const
    nsfw = writable(false);

export { nsfw }

const
    directionProcessing = async (p,c,b = null, f = 0) => {
    // calculates which direction it should move horizontally
    let offsets = [0,0]; // debugging purposes
        // this is related to the server hoster, and is enforced by svelte.

    let pfr = p.split("/"), // "" is a fallback to prevent empty strings generated by
        cfr = c.split("/"); // the router controller. Don't ask.

    if (cfr.length ^ pfr.length) { //checks if arrays are different in length
        offsets[0] = pfr.length > cfr.length ? 1 : -1;} //forwards / backwards

    // calculates which direction it should move vertically

    let pyo = navigationDirectories.findIndex(e => e.path === "/" + cfr[1 + f]),
        cyo = navigationDirectories.findIndex(e => e.path === "/" + pfr[1 + f]);
    // I'm not sure why, but adding 0 fixes the issue regarding comparing transition positions. DON'T TOUCH IT.

    if (!(offsets[0] ^ 0) && (pyo ^ cyo)) { // only moves if x isn't
        offsets[1] = pyo > cyo ? 1 : -1;} // upwards / downwards

    // sets writable memory for fetching.
    direction.set([offsets[0],offsets[1]]);

    // updates local url management.
    urlStoreArr.set(cfr);
    !b ? directory.set(c) : directory.set(b);
};

export { directionProcessing };

// TODO: USERINTERFACE CONTROLLERS

const
    navigationVisibility =  writable(true),
    socialMediaVisibility = writable(true);

export { navigationVisibility, socialMediaVisibility };