'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.post('/login', 'UserController.login').middleware('guest');
Route.post('/store', 'UserController.store').middleware('guest');
Route.get('users/:id', 'UserController.show').middleware('auth');
Route.get('/fogout', 'UserController.logout');
Route.on('/createNewAdmin').render('createnewadmin')
Route.on('/dashboard').render('dashboard').middleware('auth');
Route.on('/fluxos').render('fluxos').middleware('auth');
Route.on('/novoFluxo').render('novofluxo').middleware('auth');