
import client from "$lib/sanityClient.js";

import { genericRequests } from "$lib/queryPresets/genericQueries.js";

export async function load () {
    return {
        commissionData:
            await client.fetch(`
                *[ _type == 'commissions'][0]{
                    ...,
                    commissionExamples[]-> {
                        ${genericRequests.info},
                        ${genericRequests.sfw},
                        ${genericRequests.gallery}},
                    commissionData {
                        'commissionType': artType->typeName},
                    prices[] {
                        ...,
                        'styleName': styleType->styleName,
                        styleTypes[] {
                            renderTypePrice,
                            'renderType': renderType->renderName}},
                    additionalPurchases[] {
                        additionalPrice,
                        'additionalItem': additionalPurchases->purchaseName,
                        'additionalDescription': additionalPurchases->additionalDescription}
                }`)
    }
}