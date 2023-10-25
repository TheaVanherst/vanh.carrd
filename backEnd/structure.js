
const structure = (S) =>
  S.list()
    .title('Content Types')
    .items([
      // Optional configuration
      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'artworks','alternateArts','renderType','styleType',
          ].includes(listItem.getId())
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'character','developmentStatus','heightTag','sexTag'
          ].includes(listItem.getId())
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'githubItem', 'workshopItem','workshopSnippet'
          ].includes(listItem.getId())
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'author','websiteSocials','authorTags','internalTags'
          ].includes(listItem.getId())
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'commissioner','alterCharacter','commissionType'
          ].includes(listItem.getId())
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) => [
            'donationTier',
          ].includes(listItem.getId())
        ),

      S.listItem()
        .title('Page Data')
        .child(
          S.list()
            .title('Pages')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Q&A Section')
                .child(S.document().schemaType('questionAnswer').documentId('questionAnswer')),
              S.listItem()
                .title('Donation Data')
                .child(S.document().schemaType('donationData').documentId('donationData')),
              S.listItem()
                .title('Character Orders')
                .child(S.document().schemaType('characterOrder').documentId('characterList')),

              S.divider(),

              S.listItem()
                .title('Commission Terms')
                .child(S.document().schemaType('commissionData').documentId('commissionData')),
              S.listItem()
                .title("Commission Dos and Donts")
                .child(S.document().schemaType('commissionTypes').documentId('commissionTypes')),
              S.listItem()
                .title("Commission Pricing")
                .child(S.document().schemaType('commissionPrices').documentId('commissionPrices')),

              S.divider(),

              S.listItem()
                .title('Common Q&A')
                .child(S.document().schemaType('questionAnswer').documentId('questionAnswer')),
              S.listItem()
                .title('Carrd Links')
                .child(S.document().schemaType('featuredSocials').documentId('featuredSocials')),
            ])
        ),
      S.divider(),
    ])

export { structure };