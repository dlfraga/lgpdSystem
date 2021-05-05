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
Route.on('/esqueciMinhaSenha').render('esqueciMinhaSenha').middleware('guest');
Route.on('/createNewAdmin').render('createnewadmin')
Route.get('/dashboard', 'DashboardController.index').middleware('auth');
Route.get('/meusFluxos', 'FluxoController.index').middleware('auth');
Route.on('/novoFluxo').render('novofluxo').middleware('auth');

Route.get('users/:id', 'UserController.show').middleware('auth');

Route.post('/login', 'UserController.login').middleware('guest');
Route.post('/store', 'UserController.store').middleware('auth');

Route.get('/logout', 'UserController.logout').middleware('auth');

/**Resourcer=>  */
Route.resource('fluxos', 'FluxoController').middleware('auth');
Route.resource('solicitacoes', 'SolicitacoesController');
Route.resource('fonteDadosFluxo/:nome?', 'FontedadosfluxoController').middleware('auth');
Route.resource('meuPerfil', 'PerfilController');






