export class  CustodioData {
  id:	number	;
  pais:	string	;
  ciudad:	string	;
  direccion:	string	;
  documentoIdentificacion:	string	;
  cargo:	string	;
  compania:	string	;
  telefono:	string	;
  estado:	string	;
  created_at:	Date	;
  updated_at:	Date	;
  nombre_responsable:	string	;
  area_piso:	string	;



  constructor(id:number,
              pais:string,
              ciudad:string,
              direccion:string,
              documentoIdentificacion:string,
              cargo:string,
              compania:string,
              telefono:string,
              estado:string,
              created_at:Date,
              updated_at:Date,
              nombre_responsable:string,
              area_piso:string) {
    this.id = id;
    this.pais = pais;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.documentoIdentificacion = documentoIdentificacion;
    this.cargo = cargo;
    this.compania = compania;
    this.telefono = telefono;
    this.estado = estado;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.nombre_responsable = nombre_responsable;
    this.area_piso = area_piso;

  }
}

