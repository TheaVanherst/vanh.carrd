
// TODO: page checking and controlling

import { get, writable } from "svelte/store";

const
    scrollPos = writable(0),
    screenSize = writable(0),
    screenType = writable(0),
    bandWidths = [850, 600, 500]; //pre-determined bandwidth sizes

export { scrollPos, screenSize, bandWidths, screenType };

// TODO: Internal device management & specific code application instances.

const deviceType = writable(undefined);

export { deviceType };

// TODO: Internal directory and status management

const
    directory =     writable({raw: "/", stripped: '/'}), // directory string
    rootPath =      writable("/"); // the root directory (/homePage)
const
    pageLoaded =    writable(false), // ensures that the layout is loaded
    transitioning = writable(true); // detects page changes

export { directory, rootPath, pageLoaded, transitioning };

import { navigationDirectories } from "$lib/pageSettings/navigationDirectories.js";

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
        let offsets = 0; // debugging purposes
            // this is related to the server hoster, and is enforced by svelte.

        let pfr = p.split("/"), // "" is a fallback to prevent empty strings generated by
            cfr = c.split("/"); // the router controller. Don't ask.

        // calculates which direction it should move vertically

        let pyo = navigationDirectories.findIndex(e => e.path === "/" + cfr[1 + f]),
            cyo = navigationDirectories.findIndex(e => e.path === "/" + pfr[1 + f]);
        // I'm not sure why, but adding 0 fixes the issue regarding comparing transition positions. DON'T TOUCH IT.

        let nsfwCheck = get(nsfw) ? 2 : 1;
        if (pyo ^ cyo || pfr[nsfwCheck] !== cfr[nsfwCheck]) { // only moves if x isn't
            offsets = pyo > cyo ? 1 : -1;} // upwards / downwards

        // sets writable memory for fetching.
        // console.log(get(direction), p, c, b);
        direction.set([offsets]);
        // console.log(get(direction))
        rootProcessing(cfr, true);

        let dp = !b ? b : c;
        directory.set({ raw: dp + "/", stripped: get(nsfw) ? dp.replaceAll("/nsfw",'') + "/" : dp + "/" });
    },

    rootProcessing = (directory, parsed = false) => {
        directory = parsed ?
            directory :
            directory.split("/");
        if (get(nsfw) === true) {
            rootPath.set("/" + directory[2])
            urlStoreArr.set(directory.slice(1));}
        else {
            rootPath.set("/" + directory[1]);
            urlStoreArr.set(directory);}
    };

export { directionProcessing, rootProcessing };

// TODO: USERINTERFACE CONTROLLERS

const
    navigationVisibility =  writable(false),
    socialMediaVisibility = writable(false);

export { navigationVisibility, socialMediaVisibility };