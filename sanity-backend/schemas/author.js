export default {
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'about',
      type: 'string',
      title: 'About',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Photo (AR=1 Recommended)',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ],
}
