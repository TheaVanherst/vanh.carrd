
import {defineField, defineType} from 'sanity'
import { TagIcon }    from '@sanity/icons'
import { emojiTags, icon } from '../blocks/emojiTagData'

const
  artCategories = defineType({
    name: 'authorTags', title: 'Author Tags',
    type: 'document',
    fields: emojiTags,
    icon: TagIcon,
    preview: {
      select: {
        emoji: 'emoji',
        title: 'title',
        desc: 'description'
      },
      prepare(selection) {
        const {title, emoji, desc} = selection
        return {
          title: `${title}`,
          subtitle: desc,
          media: icon(emoji),
        }
      }
    }
  });

export default artCategories;
