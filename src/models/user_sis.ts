
export class  UserSisData {
  id:	number	;
  name:	string	;
  first_name:	string	;
  last_name:	string	;
  rol:	string	;
  padrino:	string	;
  username:	string	;
  email:	string	;
  password:	string	;
  remember_token:	string	;
  facebook_user_id:	string	;
  token:	string	;



  constructor(id:number,
              name:string,
              first_name:string,
              last_name:string,
              rol:string,
              padrino:string,
              username:string,
              email:string,
              password:string,
              remember_token:string,
              facebook_user_id:string,
              token:string) {

    this.id = id;
    this.name = name;
    this.first_name = first_name;
    this.last_name = last_name;
    this.rol = rol;
    this.padrino = padrino;
    this.username = username;
    this.email = email;
    this.password = password;
    this.remember_token = remember_token;
    this.facebook_user_id = facebook_user_id;
    this.token = token;

  }
}
