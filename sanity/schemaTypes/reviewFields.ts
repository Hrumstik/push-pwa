import {defineField} from 'sanity'

export const reviewFields = defineField({
  name: 'reviews',
  type: 'array',
  title: 'Reviews',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'reviewAuthorName',
          type: 'string',
          title: 'Author Name',
        }),
        defineField({
          name: 'reviewAuthorIcon',
          type: 'image',
          title: 'Author Icon',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'reviewAuthorRating',
          type: 'number',
          title: 'Review Rating',
        }),
        defineField({
          name: 'reviewIconColor',
          type: 'string',
          title: 'Review Icon Color',
          description: 'Choose a color for the avatar if you didn`t upload logo',
          options: {
            list: [
              {title: 'Orange', value: 'orange'},
              {title: 'Red', value: 'red'},
              {title: 'Brown', value: 'brown'},
              {title: 'Blue Grey', value: 'blueGrey'},
              {title: 'Deep Purple', value: 'deepPurple'},
              {title: 'Green', value: 'green'},
              {title: 'Blue', value: 'blue'},
            ],
          },
        }),
        defineField({
          name: 'avatarTitle',
          type: 'string',
          description:
            'Enter a single uppercase letter for the avatar title if you didn`t upload logo',
          title: 'Avatar Title',
        }),
        defineField({
          name: 'reviewDate',
          type: 'date',
          title: 'Review Date',
          options: {
            dateFormat: 'DD/MM/YY',
          },
        }),
        defineField({
          name: 'reviewText',
          type: 'object',
          title: 'Review Text',
          fields: [
            defineField({
              name: 'en',
              type: 'string',
              title: 'English',
            }),
            defineField({
              name: 'fr',
              type: 'string',
              title: 'French',
            }),
            defineField({
              name: 'nl',
              type: 'string',
              title: 'Dutch',
            }),
            defineField({
              name: 'de',
              type: 'string',
              title: 'German',
            }),
            defineField({
              name: 'es',
              type: 'string',
              title: 'Spanish',
            }),
            defineField({
              name: 'it',
              type: 'string',
              title: 'Italian',
            }),
            defineField({
              name: 'pl',
              type: 'string',
              title: 'Polish',
            }),
            defineField({
              name: 'pt',
              type: 'string',
              title: 'Portuguese',
            }),
            defineField({
              name: 'dk',
              type: 'string',
              title: 'Danish',
            }),
          ],
        }),
      ],
    },
  ],
})
