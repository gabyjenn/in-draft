import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title — English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'titleKo',
      title: 'Title — Korean',
      type: 'string',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
        name: 'sortOrder',
        title: 'Sort Order',
        type: 'number',
        description: 'Lower numbers appear first',
        validation: (Rule) => Rule.integer(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Review', value: 'review'},
          {title: 'Letter', value: 'letter'},
          {title: 'Essay', value: 'essay'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'bodyEn',
      title: 'Body — English',
      type: 'array',
      of: [
        {
            type: 'block',
            styles: [
            {title: 'Normal', value: 'normal'},
            ],
            marks: {
            decorators: [
                {title: 'Italic', value: 'em'},
                {title: 'Bold', value: 'strong'},
            ],
            annotations: [
                {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                    {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    },
                ],
                },
            ],
            },
        },

        {
            type: 'object',
            name: 'quote',
            title: 'Quote',
            fields: [
            {
                name: 'text',
                title: 'Quote',
                type: 'array',
                of: [
                {
                    type: 'block',
                    styles: [
                    {title: 'Normal', value: 'normal'},
                    ],
                    marks: {
                    decorators: [
                        {title: 'Italic', value: 'em'},
                        {title: 'Bold', value: 'strong'},
                    ],
                    },
                },
                ],
            },
            ],
        },
        ],
    }),

    defineField({
        name: 'bodyKo',
        title: 'Body — Korean',
        type: 'array',
        of: [
            {
            type: 'block',
            styles: [
                {title: 'Normal', value: 'normal'},
            ],
            marks: {
                decorators: [
                {title: 'Italic', value: 'em'},
                {title: 'Bold', value: 'strong'},
                ],
                annotations: [
                {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                    {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                    },
                    ],
                },
                ],
            },
            },

            {
            type: 'object',
            name: 'quote',
            title: 'Quote',
            fields: [
                {
                name: 'text',
                title: 'Quote',
                type: 'array',
                of: [
                    {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                    ],
                    marks: {
                        decorators: [
                        {title: 'Italic', value: 'em'},
                        {title: 'Bold', value: 'strong'},
                        ],
                    },
                    },
                ],
                },
            ],
            },
        ],
    }),
  ],
})