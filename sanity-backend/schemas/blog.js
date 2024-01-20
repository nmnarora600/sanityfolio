import {defineArrayMember} from 'sanity'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          title: 'img',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
                  be they blind, color-blind, low-sighted; 
                  alternative text is of great help for those 
                  people that can rely on it to have a good idea of 
                  what\'s on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        defineArrayMember({
          type: 'youtube',
        }),
        {
          type: 'code',
        },
      ],
    },
    {
      name: 'metadesc',
      type: 'string',
      title: 'Meta Description',
      validation: (Rule) => Rule.required(),
    
    },
    {
      title: 'Blog Image',
      name: 'blogimg',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    
    },
    {
      name: 'CreatedAt',
      type: 'datetime',
      title: 'Posted At',
    
      default: () => new Date().toISOString(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'author',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: 'Author',
          name: 'author',
          type: 'reference',
          to: [{type: 'author'}],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
  ],
}
