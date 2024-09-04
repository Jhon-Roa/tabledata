import axios from "axios";
import { ShowAlert } from "../functions/showAlertFunction";
import { useNavigate } from "react-router-dom";

function SaveProducts() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const style = {
        mainDiv: 'w-screen h-screen flex items-center justify-center p-4',
        formContainer: 'bg-white p-6 rounded-lg shadow-lg w-full max-w-md',
        formGroup: 'mb-4',
        formButtonGrop: 'flex justify-around',
        label: 'block text-gray-700 text-sm font-bold mb-2',
        input: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        buttonSend: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-0.5 transition w-2/5',
        buttonList: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-0.5 transition w-2/5 '
    }

    const formHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = document.getElementById('form-product') as HTMLFormElement

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: { [key: string]: string | number } = {};

        formData.forEach((value, key) => {
            if (key === 'price' || key === 'stock') {
                data[key] = parseFloat(value as string) || 0;
            } else {
                data[key] = value as string;
            }
        });

        for (const [key, value] of Object.entries(data)) {
            const message = `El campo ${key} está vacío`;

            if (typeof value === 'string') {
                if (value.trim() === '') {
                    ShowAlert(message, 'warning', '');
                    return;
                }
            } else if (typeof value === 'number') {
                if (isNaN(value)) {
                    ShowAlert(message, 'warning', '');
                    return;
                }
            }
        }

        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Respuesta del servidor', response.data);
        } catch (error) {
            console.error('Error al enviar datos', error);
        }

        form!.reset();    
    }

    const seeProducts = () => {
        navigate('/list');
    }

    return (
        <div className={style.mainDiv}>
            <div className={style.formContainer}>
                <form onSubmit={formHandleSubmit} id="form-product">
                    <div className={style.formGroup}>
                        <label htmlFor="code" className={style.label}><i className="fa-solid fa-atom"></i> Código:</label>
                        <input type="text" id="code" name="code" className={style.input} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="name" className={style.label}><i className="fa-solid fa-atom"></i> Nombre:</label>
                        <input type="text" id="name" name="name" className={style.input} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="price" className={style.label}><i className="fa-solid fa-atom"></i> Precio:</label>
                        <input type="number" id="price" name="price" min='0' step='0.01' className={style.input} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="stock" className={style.label}><i className="fa-solid fa-atom"></i> Stock:</label>
                        <input type="number" id="stock" name="stock" min='0' className={style.input} />
                    </div>
                    <div className={style.formButtonGrop}>
                        <button type="submit" className={style.buttonSend}>
                            <i className="fa-solid fa-floppy-disk"></i> Guardar
                        </button>
                        <button onClick={seeProducts} className={style.buttonList}>
                            <i className="fa-solid fa-list"></i> Ver productos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SaveProducts;