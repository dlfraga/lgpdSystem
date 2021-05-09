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
    async index({ view, auth, response, params, session }) {
        /**checa se o login é administrador */
        const currentUser = await User.find(auth.user.id);
        if (currentUser.is_admin == 1) {
            if (params.delete == 'true') {
                //o proprio admin não pode deletar o seu login
                if (params.id != auth.user.id) {
                    const userToBeDeleted = await User.find(params.id);
                    userToBeDeleted.delete();
                    session.flash({ notification: 'Usuário eliminado!' })
                    response.redirect('/administracao')
                } else {
                    session.flash({ notification: 'Você não pode deletar o seu login!' })
                    response.redirect('/administracao')
                }
            } else if (params.id != null) {
                try {
                    const userToBeEdited = await User.find(params.id)
                    console.log(userToBeEdited);
                    return view.render('perfil', { perfil: userToBeEdited.toJSON() });
                } catch (error) {
                    return 'Usuario nao encontrado!'
                }

            } else {
                const users = await User.all();
                return view.render('administracao', { users: users.toJSON() })
            }

        } else {
            response.redirect('/meuPerfil');
        }
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
                return response.redirect('/administracao')
            } else {
                session.flash({ error: 'Você não tem permissão para criar novos usuários!' })
                return response.redirect('/dashboard')
            }

        } else if (params.id == auth.user.id) {
            //altera o proprio perfil
            if(await this.changeExistingUser(auth.user.id, request, session, response)){
                session.flash({ notification: 'Perfil atualizado!' })
                response.redirect('/dashboard')
            }

        } else if (params !== auth.user.id) {
            //alterar o perfil de outra pessoa
            const currentUser = await User.find(auth.user.id);
            if (currentUser.is_admin == 1) {
                if(await this.changeExistingUser(params.id, request, session, response)){
                    session.flash({ notification: 'Perfil alterado!' })
                    response.redirect('/administracao')
                } else {
                    return 'falha ao alterar o usuario'
                }
            } else {
                session.flash({ error: 'Você não pode alterar o perfil de outros usuários!' })
                response.redirect('/dashboard')
            }
        } else {
            console.log('na duvida salva somente o perfil da pessoa')
            if(await this.changeExistingUser(auth.user.id, request, session, response)){
                response.redirect('/dashboard')
            }
        }
        return 'Erro na ateração de usuarios'
    }

    async delete(auth, session, request, response, params) {
        //checa se está logado
        const currentUser = await User.find(auth.user.id);
        if (currentUser != null) {
            console.log('ok deletando')
        } else {
            console.log('voce nao esta logado')
        }
    }

    async changeExistingUser(id, request, session, response) {
        const user = await User.find(id);
        user.username = request.input('username')
        user.email = request.input('email')
        user.password = request.input('password')
        return user.save()                    
    }
    async meuPerfil({ view, auth }) {
        const currentUser = await User.find(auth.user.id);
        return view.render('perfil', { perfil: currentUser.toJSON() })
    }

    async logout({ auth, response, session }) {
        await auth.logout();
        session.flash({ notification: 'Logoff com sucesso!' });
        return response.redirect('/');
    }


}

module.exports = UserController
