import { Roles } from './role';
import { Deserializable } from './deserializable';

export class User implements Deserializable {
  id: string;
  name: string;
  surname: string;
  email: string;
  players_id: string;
  role: Roles;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date;
  modifiedBy: string;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.role = user.role;
      this.players_id = user.players_id;
    } else {
      this.id = '';
      this.name = '';
      this.surname = '';
      this.email = '';
      this.role = Roles.Player;
      this.players_id = '';
    }
  }

  deserialize(input: any): this {
    Object.assign(this, <User>input);
    return this;
  }

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
}
