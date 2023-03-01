export const schemaTypes = [
  {
    title: 'Posts',
    name: 'posts',
    type: 'document',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string',
      },
      {
        title: 'Description',
        name: 'description',
        type: 'string',
      },
      {
        title: 'Content',
        name: 'content',
        type: 'array',
        of: [{type: 'block'}],
      },
      {
        title: 'Image',
        name: 'image',
        type: 'image',
      },
    ],
  },
]
