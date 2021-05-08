'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.integer('is_admin').unsigned();
    })
  }
  down() {
    this.table('users', (table) => {

    })
  }
}

module.exports = UserSchema
