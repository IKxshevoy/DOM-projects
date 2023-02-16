const btn = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
btn.addEventListener("click", openModal);

function openModal() {
    modal.style.display = "block";
    attachModalEvent();
}

function attachModalEvent() {
    modal.querySelector(".close").addEventListener("click", closeModal);
    document.addEventListener("keydown", handleEscape);
    modal.addEventListener("click", handleOutsideClick);
}

function closeModal() {
    modal.style.display = "none";
    removeModalEvent();
}

function handleEscape(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function handleOutsideClick(event) {
    const outsideClick = !!event.target.closest(".modal-content");
    if (!outsideClick) {
        closeModal();
        removeModalEvent();
    }
}

function removeModalEvent() {
    modal.querySelector(".close").removeEventListener("click", closeModal);
    document.removeEventListener("keydown", handleEscape);
    modal.removeEventListener("click", handleOutsideClick);
}