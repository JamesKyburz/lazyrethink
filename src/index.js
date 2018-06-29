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
                .getPoolMaster()
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
        if (!db || db.getPoolMaster().getLength() === 0) {
          db = require('rethinkdbdash')(options)
        }
        const result = db[prop]
        return result && result.bind ? result.bind(db) : result
      }
    }
  )
}
