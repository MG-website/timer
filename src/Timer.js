import './Timer.css';
import React,{useState,useEffect,useRef}from 'react';

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
  const myRef = useRef(null); // comienza con curren = null
  // recibe una propiedad 'current' que contiene todos los datos del imput donde fue hecha la referencia
//console.log(myRef)
//const prueba = useRef(null)
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {// si activo = true y tipo = contador
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'Cuenta Regresiva' && segundos > 0) { // si activo =true y tipo = cuenta regresiva
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {// si activo =false y segundos no es cero y tipo = contador
      clearInterval(intervalo);
    }
    if (segundos === 0 && tipo === 'Cuenta Regresiva') { // segundos = cero y  tipo = cuenta regresiva
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value //contiene el value del imput 
    setSegundos(ref)
}
  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')// si el estado 'tipo' es contador, lo pisa con C.R
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')// si el estado 'tipo' es C.R, lo pisa con Contador
}

  function reset() {
    setSegundos(0);// pisa el estado 'segundos' con cero
    setActivo(false); // pisa el estado 'activo' con false
    setActivo(true);
    if(tipo === 'Cuenta Regresiva' && myRef.current) myRef.current.value = 0
  }

  function toggle() { // pisa el estado 'activo' con su opuesto  
  setActivo(!activo);
/*     let ref = prueba.current;
    console.log(ref, 'prueba')
 */  }
  return (
    <div className="app">
    <div className="time">
      {segundos} 
    </div>
    <div className="row">
      <button  className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
        {activo ? 'Pausa' : 'Inicio'}{/*  cambio el nombre del boton dependiendo el estado, si es true => pausa sino => inicio */}
      </button>
      <button className="button" disabled={segundos === 0} onClick={reset}>
        Reset
      </button>
    </div>
    <button className="button" onClick={cambioTipo}>
        {tipo}
    </button>
    {tipo === 'Cuenta Regresiva' && <input type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>} 
     </div>  );
};

export default Timer;