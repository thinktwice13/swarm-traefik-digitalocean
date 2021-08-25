import User from '@lib/users/model'
import { getManager } from 'typeorm'

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await getManager().find(User)
    return users
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createUser = async (passphrase: string): Promise<User> => {
  const entity = new User()
  entity.passphrase = passphrase
  try {
    const records = await getManager().save([entity])
    return records[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

export const findByPassphrase = async (passphrase: number): Promise<User> => {
  try {
    const user = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.passphrase = :passphrase', { passphrase })
      .getOne()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
