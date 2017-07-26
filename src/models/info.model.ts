
export class  InfoData {
  id:	number	;
  custodio_id:	number	;
  area_id:	number	;
  no_orden:	string 	;
  fecha_solicitud:	Date	;
  fecha_ejecucion:	Date	;
  hora_inicio:	Date	;
  hora_fin:	Date	;
  informe_manto_prev_cate_id:	number	;
  requerimiento:	string 	;
  solucion:	string 	;
  resolucion:	string 	;


  constructor(id: number ,custodio_id: number ,area_id: number ,no_orden: string  ,fecha_solicitud: Date ,fecha_ejecucion: Date ,hora_inicio: Date ,hora_fin: Date ,informe_manto_prev_cate_id: number ,requerimiento: string  ,solucion: string  ,resolucion: string  ) {
    this.id = id;
    this.custodio_id = custodio_id;
    this.area_id = area_id;
    this.no_orden = no_orden;
    this.fecha_solicitud = fecha_solicitud;
    this.fecha_ejecucion = fecha_ejecucion;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.informe_manto_prev_cate_id = informe_manto_prev_cate_id;
    this.requerimiento = requerimiento;
    this.solucion = solucion;
    this.resolucion = resolucion;
  }
}
