import type { ICategory } from "../../../types/category";
import { CategoriaService } from "../../../services/categoriaService";

const addBtn = document.getElementById('create-btn') as HTMLButtonElement;
const categoriesList = document.getElementById('categories-list') as HTMLDivElement;

let categories: ICategory[] = [];

async function loadCategories() {
    try {
        categories = await CategoriaService.getAll();
        renderCategories();
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

function renderCategories() {
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const categoryElement = document.createElement('article');
        categoryElement.classList.add('category-card');
        categoryElement.innerHTML = `
            <h3 class="category-card__title">${category.nombre}</h3>
            <p class="category-card__description">${category.descripcion}</p>
            <button class="category-card__btn category-card__btn--edit" data-id="${category.id}">Editar</button>
            <button class="category-card__btn category-card__btn--delete" data-id="${category.id}">Eliminar</button>
        `;
        categoriesList.appendChild(categoryElement);
    });
}

addBtn.addEventListener('click', () => {
    const name = prompt('Nombre de la categoría:');
    const description = prompt('Descripción de la categoría:');
    if (name && description) {
        CategoriaService.create(name, description)
            .then(() => loadCategories())
            .catch(error => console.error('Error al crear categoría:', error));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    categoriesList.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('delete-btn')) {
            const id = Number(target.dataset.id);
            if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
                CategoriaService.delete(id)
                    .then(() => loadCategories())
                    .catch(error => console.error('Error al eliminar categoría:', error));
            }
        }
    });
});
