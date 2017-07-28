
export class  UserData {
  email: string;
  token_type:string;
  expires_in:number;
  access_token:string;
  refresh_token:string;


  constructor(email: string, token_type:string,  expires_in:number,  access_token:string,refresh_token:string) {

    this.email = email;
    this.token_type=token_type;
    this.expires_in=expires_in;
    this.access_token =access_token;
    this.refresh_token=refresh_token;
  }
}
