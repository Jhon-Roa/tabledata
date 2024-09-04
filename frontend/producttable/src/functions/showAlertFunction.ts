import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function ShowAlert (message: string, icon: SweetAlertIcon, foco: string) {
    _onFocus(foco);
    const Myswal = withReactContent(Swal);
    Myswal.fire({
        title: message,
        icon: icon
    })
}

function _onFocus(foco: string) {
    if(foco !== '') {
        document.getElementById(foco)?.focus();
    }
}