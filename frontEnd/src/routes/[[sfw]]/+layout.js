
import { navStatus } from "$lib/pageSettings/redirectHandling.js";

export async function load({ params }) {
    navStatus.update(e => ({...e, nsfw: (params.sfw === 'nsfw')}));
        // needs to be done locally.
};