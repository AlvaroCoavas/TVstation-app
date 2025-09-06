import { Injectable } from '@angular/core';
import { IUser, IUserCreate } from 'src/app/interfaces/IUser';
import { Storage } from '../../providers/storage/storage';
import { Uuid } from '../../providers/uuid/uuid';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(
    private readonly storageSrv: Storage,
    private readonly uuidSrv: Uuid
  ) {}

  register(user: IUserCreate): IUser {
    const users = this.storageSrv.get<IUser[]>('users') || [];
    const isEmailExist = users.find((_u) => _u.email === user.email);

    if (isEmailExist) {
      throw new Error('Email already exists');
    }

    const newUser: IUser = {
      id: this.uuidSrv.get(),
      uuid: this.uuidSrv.get(),
      ...user,
      password: btoa(user.password),
    };
    users.push(newUser);
    this.storageSrv.set('users', JSON.stringify(users));
    return newUser;
  }

  login(email: string, password: string): IUser {
    const users = JSON.parse(this.storageSrv.get('users') || '[]') as IUser[];
    const user = users.find(
      (u) => u.email === email && u.password === btoa(password)
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.storageSrv.set('currentUser', JSON.stringify(user));
    return user;
  }

  isLogged(): boolean {
    return !!this.storageSrv.get('currentUser');
  }

  logout(): void {
    this.storageSrv.set('currentUser', null);
  }
}
