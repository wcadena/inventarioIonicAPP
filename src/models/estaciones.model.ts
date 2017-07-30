export class  EstacionData {
  id:	number	;
  estacion:	string	;
  created_at:	Date	;
  updated_at:	Date	;
  pais:	string	;
  nombre_largo:	string	;



  constructor(id:number,
              estacion:string,
              created_at:Date,
              updated_at:Date,
              pais:string,
              nombre_largo:string,
  ) {
    this.id = id;
    this.estacion = estacion;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.pais = pais;
    this.nombre_largo = nombre_largo;

  }
}
