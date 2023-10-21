import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'
import { ImagesIcon } from '@sanity/icons'

import { nsfwBlock, authorBlock } from '../chunks/genericBlocks'

export default defineType({
  name: 'artworks',
  title: 'Artworks',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'pieceName', title: 'Artwork Piece Name',
      description: 'what is the name of the artwork piece?',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description', title: 'Description',
      description: 'give a short description of the piece(s)',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      options: {
        source: 'pieceName',
        maxLength: 24,
        isUnique: slugUniqueCheck,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'gallery', title: 'Gallery of Images',
      type: 'blockGallery',
    }),

    defineField({
      name: 'discordReferences',
      title: 'Discord Referencing',
      type: 'object',
      fields: [
        defineField({
          name: 'photoshopRef', title: 'Photoshop Message ID',
          type: 'string',
        }),
        defineField({
          name: 'archiveRef', title: 'Artchive Message ID',
          type: 'string',
        }),
      ]
    }),

    defineField({
      name: 'characters', title: 'Characters',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'character'}]
      }],
    }),

    defineField({
      name: 'commissionData',
      title: 'Commission Information',
      type: 'object',
      fields: [
        defineField({
          name: 'characters', title: 'Characters',
          type: 'array',
          of: [{
            type: 'reference',
            to: [{ type: 'alterCharacter' }]
          }],
        }),
        defineField({
          name: 'artType', title: 'Commission Type',
          type: 'reference',
          to: [{ type: 'commissionType' }]
        }),
      ]
    }),

    defineField({
      name: 'authors', title: 'Authors',
      type: 'array',
      of: [
        {
          name: 'object',
          validation: Rule => Rule.required(),
          type: 'object',
          fields: [
            authorBlock,
            {
              name: 'participation', title: 'Participation',
              validation: Rule => Rule.required(),
              type: 'reference',
              to: { type: 'authorTags' }
            }
          ],
          preview: {
            select: {
              title: 'author.fullName',
              desc: 'participation.emoji',
              media: 'author.userPortrait'
            },
            prepare: ({title, desc, media}) => {
              return {
                title: `${desc} ${title}`,
                media: media
              }
            }
          },
        },
      ],
      validation: Rule => Rule.required(),
    }),

    nsfwBlock,

    defineField({
      name: 'publishedAt', title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
      initialValue: (new Date()).toISOString()
    }),
  ],
  icon: ImagesIcon,
  preview: {
    select: {
      title: 'pieceName',
      author1: 'authors.0.author.fullName',
      author2: 'authors.1.author.fullName',
      author3: 'authors.2.author.fullName',
      author4: 'authors.3.author.fullName',
      media: 'gallery.images[0]',
      photoshop: 'discordReferences.photoshopRef',
      archive: 'discordReferences.archiveRef'
    },
    prepare: ({ title, author1, author2, author3, author4, media, photoshop, archive }) => {
      let returnString = "";

      returnString += " A" + (archive ? '✔️ ' : '❌ ')
      returnString += " P" + (photoshop ? '✔️ ' : '❌ ')

      returnString += "Created by ";

      const authors = [author1, author2, author3, author4].filter(Boolean);

      for (let i = 0; i < authors.length; i++) {
        returnString += authors[i] + (i < authors.length - 1 ? ", " : " ");}

      return {
        title: title,
        subtitle: returnString,
        media: media,
      }
    }
  },
});
