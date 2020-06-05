import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { RouterMiddleware, Status } from "https://deno.land/x/oak/mod.ts"
import { users } from "../db/dumy.db.ts"
import { User } from "../interfaces/user.interface.ts"

export const getHome: RouterMiddleware = ({ response }) => {
  response.body = "Hello from Deno Land, bro";
};

export const getUsers: RouterMiddleware = ({ response }) => {
  response.body = {
    ok: true,
    message: 'Ok',
    data: users
  };
};

export const getUser: RouterMiddleware = ({ params, response }) => {
  const { id } = params
  const user = users.find( user => user.id === id )

  if (user) {
    response.status = Status.OK
    response.body = {
      ok: true,
      data: user
    }
  } else {
    response.status = Status.NoContent
    response.body = {
      ok: false,
      message: 'There\'s no result'
    }
  }
};

export const createUser: RouterMiddleware = async ({ request, response }) => {
  const body = await request.body()

  if (!request.hasBody) { 
    response.status = Status.BadRequest
    response.body = {
      ok: false,
      message: 'Data is required'
    }
  } else {
    const user: User = body.value
    user.id = v4.generate()
    users.push(user)
    
    response.status = Status.OK
    response.body = {
      ok: true,
      message: 'User successfully created',
      data: users
    }
  }

};

export const updateUser: RouterMiddleware = async ({ request, params, response }) => {
  const finded = users.find( user => user.id === params.id )
  if (!finded) {
    response.status = Status.NoContent
    response.body = {
      ok: false,
      message: 'User not exists'
    }
  } else {
    const body = await request.body()
    const userToUpdate = body.value

    const updated = users.map((user) => 
      user.id === params.id ? { ...user, ...userToUpdate } : user
    )

    response.status = Status.OK
    response.body = {
      ok: true,
      message: 'User updated',
      data: updated
    }
  }
};

export const deleteUser: RouterMiddleware = ({ params, response }) => {
  const { id } = params
  const filtered = users.filter( user => user.id !== id )

  response.status = Status.OK
  response.body = {
    ok: true,
    data: filtered,
    message: 'User deleted'
  }
};
