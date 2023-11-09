
import { defineField, defineType } from 'sanity'
import { CircleIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'explicitTags', title: 'Explicit Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'})],
    icon: CircleIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, emoji, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;