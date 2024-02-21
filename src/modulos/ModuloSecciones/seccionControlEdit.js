const puntos = ['perfil de egreso', 'objetivos educacionales'];
const link = 'ver plan de estudios'
const description = ['objetivo general',puntos[1], 'perfil de ingreso','vision','mision',gitpuntos[1]]


const hasSeccions = (data) => {
  console.log(puntos.find(value => data.toLowerCase() === value)!== undefined);
  return puntos.find(value => data.toLowerCase() === value) !== undefined
}
const hasLink = (data) =>  {
  return link === data.toLowerCase();
}

const hasDescription = (data) => {
  return description.find(value => data.toLowerCase() === value) !== undefined
}

const controlButton = (nuevosObjetos,borrarObjetos,data) => {
  const dataButton = {label: "", tab:"",click:"",finish:false}
  if(hasSeccions(data.toLowerCase())) {
    if (nuevosObjetos.length > 0 && borrarObjetos.length === 0){
      dataButton.label = "Siguiente";
      dataButton.tab = "contenidoNuevo";
    }
    else if(nuevosObjetos.length === 0 && borrarObjetos.length > 0)
    {
      dataButton.label = "Siguiente";
      dataButton.tab = "contenidoBorrar";
    }
     else if (nuevosObjetos.length > 0 && borrarObjetos.length > 0) {
      dataButton.label = "Siguiente";
      dataButton.tab = "contenidoNuevo"
    } else {
      dataButton.label = "Finalizar";
      dataButton.finish = true;
    }
  }
  else {
    dataButton.label = "Finalizar";
    dataButton.finish = true;
  }
  return dataButton;
}

const obtenerCategoriaPunto = (data) => {
  let nameCategory = puntos.find(value => data.toLowerCase() === value);
  return nameCategory === puntos[0] ? 'Punto de perfil de egreso' : 'Objetivo educacional';
}

const validarDescription = (title,data) => hasDescription(title) && data.length === 0


const validarLink = (title,data) => hasLink(title) && data.length === 0;

export default{
  hasSeccions, hasLink, hasDescription, controlButton, obtenerCategoriaPunto, validarDescription, validarLink
}
