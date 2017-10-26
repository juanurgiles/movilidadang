export interface Movilidad {
    rolprincipal?;
    edad?;
    genero?;
    ciudad?;
    parroquia?;
    calle?;
    numero?;
    interseccion?;
    nrodesplazamientos?;
    desplazamientos1: Desplazamiento[];
    desplazamientos2: Desplazamiento[];

}
import { Desplazamiento } from './desplazamiento.model';
