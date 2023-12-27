
import { get } from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";
import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";

const
    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        goto(pageData);
    },
    queryFilter = (dataSet) => {
        navigationControls.update(e => ({...e, direction: 0}));
        let searchQuery = (get(dataSetStore).searchQuery).toLowerCase() ?? "";
            // just ensures everything is lowercase.
        if (!get(navigationControls).nsfw ) {
            searchQuery += " !!sfw";}
        // adds a NSFW absolute filter to allow users to filter for only SFW content.
        return dataSet.filter(i => {
            let array = searchQuery.split(' ');
            return array.every(el => i.searchTerms.toLowerCase().includes(el))
        }) ?? [];
    };

export { urlSerializer, queryFilter }

const
    searchTermBuilder = {
        sfw:
            e => e?.sfw ? `!!sfw `: `!!nsfw ` ?? '',
        title:
            e => `${e.pieceName.replaceAll(" ","_")} ${e.slug} `,
        renderStyle:
            e => `${e.gallery.renderType} ${e.gallery.styleType} `,
        tags:
            e => !!e.tags ? `${e.tags.map(
                i => `${i.title.replace(' ','_')}${(!!i?.relatedTags ? ` ${i.relatedTags}` : '')} `).join('')}` : '',
        authors:
            e => !!e.authors ? e.authors.map(
                a => `${a.author.fullName} @${a.author.handle}`).join('') : '',
        characters:
            e => !!e.characters ? e.characters?.map(
                c => `:${c.fullName} :${c.nickName} `).join('') : '',
        commissions:
            e => !!e.commissionData ?
                `${e.commissionData?.commissionType} commission commissioned` + e.commissionData?.characters?.map(
                    c => `${c.fullName} ${c.owner.handle} `).join('') : ''
    };

export { searchTermBuilder }