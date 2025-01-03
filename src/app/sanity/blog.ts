export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
      {
          name: 'name',
          type: 'string',
          title: 'Name',
      },
      {
          name: 'description',
          type: 'string',
          title: 'Description',
      },
      {
          name: 'poster',
          type: 'image',
          title: 'Poster',
          fields: [
              {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
              },
              {
                  name: 'attribution',
                  type: 'string',
                  title: 'Attribution',
              },
          ],
      },
      {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          options: {
              source: 'name',
              maxLength: 100, 
          },
      },
  ],
};
