# lazyrethink

lazy wrapper around rethinkdbdash

* Doesn't create a connection pool until the first call to db. is made, requiring it with no db calls does nothing.
* Adds a release function to db if you are using this with lambda functions, or tests that wait for an empty event loop.
* You need to have installed `rethinkdbdash` this module has no dependencies.

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/lazyrethink.svg)](https://greenkeeper.io/)
[![build status](https://api.travis-ci.org/JamesKyburz/lazyrethink.svg)](https://travis-ci.org/JamesKyburz/lazyrethink)
[![downloads](https://img.shields.io/npm/dm/lazyrethink.svg)](https://npmjs.org/package/lazyrethink)

### usage

```javascript
const options = undefined // rethinkdbdash options
const db = require('lazyrethink')(options)
db
.db('test')
.table('test')
.coerceTo('array')
.then(console.log)
.then(db.release)
.catch(console.error)
```

# license

[Apache License, Version 2.0](LICENSE)
