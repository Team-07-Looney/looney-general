export const openPopup = () => {
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.remove('hidden');
}

export const closePopup = () => {
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.add('hidden');
}

export const submitDelete = () => {
    const form = document.getElementById('deleteForm');
    form.submit();
}