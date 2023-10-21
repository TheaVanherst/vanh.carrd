
import { writable, get } from "svelte/store"
import { page } from '$app/stores';

import {goto} from "$app/navigation";

const
    searchQuery = (data) => {
        const { subscribe, set, update } = writable({
            data: data,
            filtered: data,
            search: ""
        });
        return { subscribe, set, update }
    },

    searchHandler = (store) => {
        const searchTerm = store.search.toLowerCase() || ""
        store.filtered = store.data.filter(item => {
            let array = searchTerm.split(' ');
            return array.every(el => item.searchTerms.toLowerCase().includes(el))});
    },

    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}

        goto(pageData);
    };

export { urlSerializer, searchQuery, searchHandler }