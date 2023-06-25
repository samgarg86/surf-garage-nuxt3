export default (items) => items.map(i => ({
    id: i.sys.id,
    url: i.fields.file.url,
    title: i.fields.title
  }))
