import {defineType, defineField} from 'sanity'

const youtube = defineType({
  name: 'youtube',
  type: 'document',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    })
  ]
})
export default youtube;