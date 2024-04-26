
import client from "$lib/sanityClient.js";

import { characterData }    from "$lib/queryPresets/characterData.js";
import { authorQueries }    from "$lib/queryPresets/authorQueries.js";
import { genericRequests }  from "$lib/queryPresets/genericQueries.js";

export const load = async () => {
    return {
        erotica:
            await client.fetch(`
                *[ _type == 'erotica' ][] | order(publishedAt desc){
                    ${genericRequests.info},
                    image,
                    story,
                    characters[]-> {
                        ${characterData.preview},
                        ${characterData.info}},
                    "authors": authors[].author->{
                        ${authorQueries.info},
                        ${authorQueries.icon},
                        ${authorQueries.socials}},
                    ${genericRequests.tags}
                }`
            )
    };
}