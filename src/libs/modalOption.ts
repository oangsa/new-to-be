import { ModalOptions } from "flowbite";

export const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    }
}