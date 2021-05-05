'use strict'
const User = use('App/Models/User')

class PerfilController {
    async index({ view, auth }) {
        const currentUser = await User.find(auth.user.id);            
        return view.render('perfil', {perfil: currentUser.toJSON()})        
    }

    async store({ request, response, session, auth }) {
        const currentUser = await User.find(auth.user.id);        
        currentUser.username = request.input('username')
        currentUser.email = request.input('email')
        currentUser.password = request.input('password')    
        if(currentUser.save()){
            session.flash({ notification: 'Detalhes atualizados!' })
            return response.redirect('/dashboard')
        }
        
        
    }
}

module.exports = PerfilController
