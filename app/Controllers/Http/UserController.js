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

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "Você não pode ver o perfil de outros usuários"
        }
        return auth.user;
    }

    async store({ request, response, session }) {
        const user = new User();        
        user.username = request.input('username')
        user.email = request.input('email')
        user.password = request.input('password')
        await user.save()
        session.flash({ notification: 'Usuário adicionado!' })
        return response.redirect('back')
    }

    async logout({ auth, response, session }){
        await auth.logout();
        session.flash({ notification: 'Logoff com sucesso!' });
        return response.redirect('/');
    }
}

module.exports = UserController
