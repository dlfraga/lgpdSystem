'use strict'
const User = use('App/Models/User')

class UserController {
    async login({ auth, request, session, response }) {
        const { email, password } = request.all()

        try {
            await User.firstOrFail();
        } catch (error) {            
            const newAdmin = new User();
            newAdmin.username = 'Admin';
            newAdmin.password = 'Dip123rudp'
            newAdmin.email = 'daniel2k787@gmail.com'
            await newAdmin.save();
            session.flash({ notification: 'Nenhum login no sistema! Criado admin padrão' })
        }
        try {
            await auth.attempt(email, password)
            session.flash({ notification: 'Login realizado com sucesso!' })
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
                    response.redirect('/Administracao')
                } else {
                    session.flash({ error: 'Você não pode deletar o seu login!' })
                    response.redirect('/Administracao')
                }
            } else if (params.id != null) {
                try {
                    const userToBeEdited = await User.find(params.id)                    
                    return view.render('perfil', { perfil: userToBeEdited.toJSON() });
                } catch (error) {
                    session.flash({ error: 'Usuário não encontrado!' })
                    response.redirect('/Administracao')
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
                if (request.input('is_admin') == 'true') {
                    user.is_admin = 1;
                } else {
                    user.is_admin = 0;
                }
                try {
                    await user.save()    
                    session.flash({ notification: 'Usuário adicionado!' })
                    return response.redirect('/Administracao')
                } catch (error) {
                    session.flash({ error: 'Erro na adição do usuário! Verifique se o e-mail já não está cadastrado' })    
                    return response.redirect('/Administracao')
                }                                
            } else {
                session.flash({ error: 'Você não tem permissão para criar novos usuários!' })
                return response.redirect('/dashboard')
            }

        } else if (params.id == auth.user.id) {
            //altera o proprio perfil
            if (await this.changeExistingUser(auth.user.id, request, session, response)) {
                session.flash({ notification: 'Perfil atualizado!' })
                response.redirect('/dashboard')
            }

        } else if (params !== auth.user.id) {
            //alterar o perfil de outra pessoa
            const currentUser = await User.find(auth.user.id);
            if (currentUser.is_admin == 1) {
                if (await this.changeExistingUser(params.id, request, session, response)) {
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
            if (await this.changeExistingUser(auth.user.id, request, session, response)) {
                response.redirect('/dashboard')
            }
        }
        session.flash({ error: 'Erro desconhecido' })        
        response.redirect('/dashboard')
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
