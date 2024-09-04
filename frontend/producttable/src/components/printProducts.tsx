import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type producto = {
    code: string,
    name: string,
    price: number,
    stock: number
}

function PrintProducts() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);

    const styles = {
        mainDiv: 'w-full h-screen flex justify-center flex-wrap relative',
        cardDiv: 'w-60 h-60 flex flex-col justify-between items-start bg-white p-6 m-2 rounded-lg shadow-lg hover:shadow-xl max-w-md transition-shadow',
        title: 'text-gray-800 text-lg font-bold mb-4 self-center',
        text: 'text-gray-700 text-sm mb-2 ml-1',
        backButton: 'start-4 top-4 absolute bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-0.5 transition w-32',
        button: 'self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline transform hover:-translate-y-0.5 transition-transform w-40'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl)
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchData();
    }, []);

    const deleteProduct = async (idProduct: string) => {

        axios.delete(apiUrl + '/' + idProduct)
            .then(response => {
                console.log(response);
                console.log('delete post with id ' + {idProduct});
            })
            .catch(error => {
                console.error(error);
            })

        location.reload();
    }

    const mapDataCard = () => {
        return data.map((producto: producto) => (
            <div key={producto.code} className={styles.cardDiv}>
                <h1 className={styles.title}>{producto.name}</h1>
                <h4 className={styles.text}>Codigo: {producto.code}</h4>
                <h3 className={styles.text}>Precio: {producto.price}</h3>
                <h3 className={styles.text}>Stock: {producto.stock}</h3>
                <button className={styles.button} onClick={() => deleteProduct(producto.code)}>
                    <i className="fa-solid fa-trash"></i>eliminar
                </button>
            </div>
        ))
    }

    const goBackFunction = () => {
        navigate('/');
    }

    return (
        <div className={styles.mainDiv}>
            <button className={styles.backButton} onClick={goBackFunction}>
                <i className="fa-solid fa-left-long"></i> Volver
            </button>
            {data.length > 0 ? mapDataCard() : <p>no hay productos disponibles</p>}
        </div>
    )
}

export default PrintProducts;