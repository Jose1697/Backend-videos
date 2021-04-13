const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt') //encriptar password

class UsersService {
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUser({ email }){
        const [ user ] = await this.mongoDB.getAll(this.collection, { email });
        return user;
    }

    async createUser({ user }){
        const { name, email, password } = user; //destructuramos el usuario q recibimos
        const hashedPassword = await bcrypt.hash(password, 10); //creamos el hash del password con un numero de iteraciones
        const createUserId = await this.mongoDB.create(this.collection, { //Creamos el usuario
            name,
            email,
            password: hashedPassword
        })

        return createUserId

    }
}

module.exports = UsersService