export default{
    name: 'code',
    type: 'object',
    fields: [
      {
        name: 'language',
        title: 'Language',
        type: 'string',
        options: {
          list: [
            { title: 'JavaScript', value: 'js' },
            { title: 'React Component', value: 'jsx' },
           
            { title: 'Markdown', value: 'md' },
            { title: 'Bash', value: 'bash' },
            // Add other supported languages as needed
          ],
        },
      },
      {
        name: 'code',
        title: 'Code',
        type: 'text',
      },
    ],
  }