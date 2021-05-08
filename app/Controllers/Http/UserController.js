'use strict'
const User = use('App/Models/User')

class UserController {
    async login({ auth, request, session, response }) {
        const { email, password } = request.all()

        try {
            await User.firstOrFail();
        } catch (error) {
            session.flash({ notification: 'Nenhum login no sistema! Por favor crie um novo admin' })
            return response.redirect('/createNewAdmin')
        }
        try {
            await auth.attempt(email, password)
            return response.redirect('/dashboard')
        } catch (PasswordMismatch) {
            session.flash({ error: 'Erro no login ou senha. Tente novamente' })
            //return 'Credenciais inválidas'
            return response.redirect('back')
        }
    }

    /**
     * Lista os usuarios ou os perfis
     */
    async index({ view, auth, response }) {
        /**checa se o login é administrador */
        const currentUser = await User.find(auth.user.id);
        if (currentUser.is_admin == 1) {
            const users = User.all();
            return view.render('administracao', { users: users })
        } else {
            return view.render('perfil', { perfil: currentUser.toJSON() })
        }
    }

    async show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "Você não pode ver o perfil de outros usuários"
        }
        return auth.user;
    }

    async store({ auth, session, request, response, params }) {
        //alterar o proprio perfil
        //cria novo usuario se o autenticador for o admin. caso negativo abandona
        if (params.id == null) {
            const currentUser = await User.find(auth.user.id);
            if (currentUser.is_admin == 1) {
                const user = new User();
                user.username = request.input('username')
                user.email = request.input('email')
                user.password = request.input('password')
                await user.save()
                session.flash({ notification: 'Usuário adicionado!' })
                return response.redirect('back')
            } else {
                session.flash({ error: 'Você não tem permissão para criar novos usuários!' })
                return response.redirect('back')
            }

        } else if (params.id == auth.user.id) {
            //altera o proprio perfil
            return await this.changeExistingUser(auth.user.id, request, session, response);

        } else if (params !== auth.user.id) {
            //alterar o perfil de outra pessoa
            const currentUser = await User.find(auth.user.id);
            if (currentUser.is_admin == 1) {
                return await this.changeExistingUser(params.id, request, session, response);
            } else {
                session.flash({ error: 'Você não pode alterar o perfil de outros usuários!' })
            }
        } else {
            console.log('na duvida salva somente o perfil da pessoa')
            return await this.changeExistingUser(auth.user.id, request, session, response);
        }
        return 'Erro na ateração de usuarios'
    }

    async meuPerfil({ view, auth }) {
        const currentUser = await User.find(auth.user.id);            
        return view.render('perfil', {perfil: currentUser.toJSON()})        
    }

    async changeExistingUser(id, request, session, response) {
        const user = await User.find(id);
        user.username = request.input('username')
        user.email = request.input('email')
        user.password = request.input('password')
        if (user.save()) {
            session.flash({ notification: 'Detalhes atualizados!' })
            return response.redirect('/dashboard')
        }
    }

    async logout({ auth, response, session }) {
        await auth.logout();
        session.flash({ notification: 'Logoff com sucesso!' });
        return response.redirect('/');
    }


}

module.exports = UserController
