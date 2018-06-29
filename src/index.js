module.exports = options => {
  let db
  let created = 0
  const assertDb = () => {
    if (db && created && Date.now() - created < 100) return
    if (!db || db.getPoolMaster().getLength() === 0) {
      created = Date.now()
      db = require('rethinkdbdash')(options)
    }
  }
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
        assertDb()
        const result = db[prop]
        return result && result.bind ? result.bind(db) : result
      }
    }
  )
}
