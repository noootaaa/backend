import User from '#apps/user/models/user'
import { GetUserSchema } from "#apps/user/validators/user";

export default class UserService {
  async findAll({ limit = 10, page = 1}: GetUserSchema) {
    return User.query().paginate(page, limit)
  }

  async findById(id: string) {
    return User.query().where('id', id).firstOrFail()
  }

  async findByOidcId(oidcId: string) {
    return User.query().where('oidc_id', oidcId).firstOrFail()
  }
}
