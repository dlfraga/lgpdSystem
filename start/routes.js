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
/**Renderizacoes */
Route.on('/').render('index')
Route.on('/esqueciMinhaSenha').render('esqueciminhaSenha').middleware('guest');
Route.on('/createNewAdmin').render('createnewadmin')
Route.on('/editarFluxo').render('editarFluxo').middleware('auth')
Route.on('/novoFluxo').render('novofluxo').middleware('auth');

/**mix*/
Route.get('/dashboard', 'DashboardController.index').middleware('auth');
Route.get('users/:id', 'UserController.show').middleware('auth');
Route.get('/logout', 'UserController.logout').middleware('auth');

/**Envios manuais */
Route.post('/login', 'UserController.login').middleware('guest');
Route.post('/store', 'UserController.store').middleware('auth');

Route.get('/meusFluxos/:pag?', 'FluxoController.index').middleware('auth');
/**Resources completos=>  */
Route.resource('fluxos/:fluxo?', 'FluxoController').middleware('auth');



Route.resource('solicitacoes', 'SolicitacoesController');
Route.resource('fonteDadosFluxo/:nome?', 'FontedadosfluxoController').middleware('auth');
Route.resource('meuPerfil', 'PerfilController');






