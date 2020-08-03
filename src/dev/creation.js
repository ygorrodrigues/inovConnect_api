const bcrypt = require('bcrypt')

class Test {
  async createGlobalPass() {
    const pass = await bcrypt.hash('kkkk', 10)
    return pass
  }
}

module.exports = new Test