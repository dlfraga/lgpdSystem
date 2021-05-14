
// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

 'use strict'

 var gentlyCopy = require('gently-copy')
 
 var filesToCopy = ['node_modules/bulma-toast/dist/bulma-toast.min.js', 'node_modules/bulma/css/bulma.min.css']
 
 // User's local directory
 var userPath = process.env.INIT_CWD
 
 // Moving files to user's local directory
 gentlyCopy(filesToCopy, 'public/')