module.exports = options => {
  let db
  return new Proxy(
    {},
    {
      get (obj, prop) {
        if (prop === 'release') {
          return () => {
            if (db) {
              return db
                .getPool()
                .drain()
                .then(() => {
                  db = null
                })
                .catch(_ => {
                  db = null
                })
            }
            return Promise.resolve()
          }
        }
        if (
          typeof prop === 'symbol' ||
          prop === 'inspect' ||
          prop === 'valueOf'
        ) {
          return
        }
        db = db || require('rethinkdbdash')(options)
        const result = db[prop]
        return result && result.bind ? result.bind(db) : result
      }
    }
  )
}
