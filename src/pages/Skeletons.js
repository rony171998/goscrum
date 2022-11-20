/*Consulta con skeletons
Consigna


El usuario acaba de ingresar a su "Catalogo Personal" (Componente Catalogo), para obtener una serie de articulos que se encuentran disponibles por medio de una API. Para eso, se debe realizar una peticion HTTP del tipo GET apenas se cargue la pagina para obtener la informacion necesaria. Ya se encuentra realizada la logica para llevar a cabo la peticion, disponible mediante la llamada al metodo `fetchCatalogData()`.
Mientras el usuario espera la respuesta de la API, para hacer la espera mas agradable, se debera visualizar una serie de templates (Componente Skeleton) donde posteriormente ocupara el lugar la inforamcion devuelta. Estos templates deben coincidir con un diseño similar a las de las tarjetas.
Cuando llegue la respuesta con toda su informacion, se debera representarla en una serie de tarjetas con la informacion asociada a cada articulo. Estas tarjetas ya se encuentran disponibles mediante el componente `Cards`.
En caso de que no existan articulos disponibles, la API devolvera un mensaje {status: 404, data: [] }. Para esta situacion, se debera mostrar al usuario el componente `NotFound`, el cual ya se encuentra disponible para su uso.
Si llegara a fallar la API por cualquier otro razon, osea un status diferente a 404, se debera disparar un modal explicando el error. Para esto se hara uso de la libreria SweetAlert2, la misma ya se encuentra importada en la constante `Swal`.



Detalles

Componente Catalog

Se debera realizar una peticion HTTP, utilizando la función `fetchCatalogData()` al cargarse el componente. (Recorda que es una consulta asyncrona)

Mientras la request se encuentra procesando, se deberan mostrar **6** componentes `Skeleton`.

Una vez que vuelva la response, estos deberan de desaparecer.

Si la API devuelve la respuesta correctamente, se debera visualizar el componente `Cards`.

Se debera pasar mediante la prop `data` el array devuelto por la API, que posee el contenido deseado para mostrar.

En caso de que la API devuelva un status igual a `404`, se debera mostrar el componente `NotFound`.

Si la API devuelve cualquier otro tipo de status (ej. status: 500), se debera mostrar un modal avisando que no se pudo realizar la peticion utilizando el metodo `Swal.fire(icon: string, title: string, text:string)` de la liberia SweetAlert2. El contenido del modal aun no fue decidido, por lo que podra mostrarse cualquier mensaje que usted quiera de momento.



Componente Skeleton

El contenedor debe ser un bloque de 450px de ancho, con un margen superior de 50px y su texto alineado hacia la izquierda.

Debe poseer un placeholder para el titulo del articulo, con la clase `skeleton-header` asignada.

El equipo de diseño solicito que el placeholder del titulo posea un color de fondo `lightgrey`, deba tener un alto de 16px y ocupar la mitad del ancho del bloque padre.

Debe poser 3 lineas de placeholders para el texto, cada una con la clase `skeleton-line` asignada.

El equipo de diseño solicito que cada una de estas lineas debe tener un color de fondo `lightgrey`, tener 10px de alto y un ancho del 90% del bloque, expecto la ultima linea, la cual debera ocupar el 70%.



Estructura respuesta de fetchCatalogData()
{
    status: (number),
    data: [
      {
        userId: (number),
        id: (number),
        title: (string)
      }
    ]
}



ATENCIÓN!⚠️
Ten en cuenta que las librerías importadas globalmente pueden ser utilizadas sin necesidad de volver a importarlas, llamando a los métodos correspondientes utilizando la constante provista en la consigna directamente.
*/
import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
const useState = React.useState;
const useEffect = React.useEffect;


const Skeleton = () => {
    return (
        <div className="skeleton"
            style={{
                width: '450px',
                marginTop: '50px',
                textAlign: 'left'
            }}
        >
            <div className="skeleton-header" style={{backgroundColor: 'lightgrey', height: '16px', width: '50%'}}></div>
            <div className="skeleton-line" style={{backgroundColor: 'lightgrey', height: '10px', width: '90%'}}></div>
            <div className="skeleton-line" style={{backgroundColor: 'lightgrey', height: '10px', width: '90%'}}></div>
            <div className="skeleton-line" style={{backgroundColor: 'lightgrey', height: '10px', width: '70%'}}></div>
        </div>
    );
}        
 
const Catalog = () => {
    const [loading, setLoading] = useState(true);
    const [catalogData, setCatalogData] = useState([]);
 
    const fetchData = async () => {
        const response = await fetchCatalogData();
        if (response.status === 200) {
            setCatalogData(response.data);
        }else if(response.status === 404){
            setCatalogData([]);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        setLoading(false);

    };
 
    useEffect(() => {
        fetchData()
    }, []);
 
 
    return (
        <div>
            {loading && [...Array(6)].map((e, i) => <Skeleton key={i} />)}
            {catalogData.length > 0 && <Cards data={catalogData} />}
            {catalogData.length === 0 && <NotFound />}                       
           
        </div>
    );
};
 
 
export { Catalog, Skeleton, NotFound };