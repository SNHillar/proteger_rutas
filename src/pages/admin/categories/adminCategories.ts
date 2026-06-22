import type { ICategory } from "../../../types/category";
import { CategoriaService } from "../../../services/categoryService";

const addBtn = document.getElementById('create-btn') as HTMLButtonElement;
const categoriesList = document.getElementById('categories-list') as HTMLDivElement;
const modalCategory = document.getElementById('categoryModal') as HTMLDivElement;
const categoryForm = document.getElementById("categoryForm") as HTMLFormElement;
const categoryNameInput = document.getElementById("categoryName") as HTMLInputElement;
const categoryDescriptionInput = document.getElementById("categoryDescription") as HTMLTextAreaElement;

let categories: ICategory[] = [];

async function loadCategories() {
    try {
        categories = await CategoriaService.getAll();
        renderCategories(categories);
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

function renderCategories(categories: ICategory[]) {

    if(!categories) return;
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const categoryElement = document.createElement('article');
        categoryElement.classList.add('management-card');

        const cardContent = document.createElement('div') as HTMLDivElement;
        cardContent.classList.add('management-card__content', 'management-card__content--categories')


        const categoryTitle = document.createElement('h3') as HTMLHeadingElement;
        categoryTitle.classList.add('category-card__title');
        categoryTitle.textContent = `${category.name}`;
        
        const categoryDescription = document.createElement('p') as HTMLParagraphElement;
        categoryDescription.classList.add('category-card__description');
        categoryDescription.textContent = `${category.description}`;

        const actionsBtns = document.createElement('div') as HTMLDivElement;
        actionsBtns.classList.add('management-card__actions')

        const editBtn = document.createElement('button') as HTMLButtonElement;
        editBtn.classList.add('btn-icon-action', 'btn-icon-action--edit');
        editBtn.dataset.id = `${category.id}`;
        editBtn.textContent = "Editar";

        const deleteBtn = document.createElement('button') as HTMLButtonElement;
        deleteBtn.classList.add('btn-icon-action', 'btn-icon-action--delete');
        deleteBtn.dataset.id = `${category.id}`;
        deleteBtn.textContent = "Eliminar";

        actionsBtns.append(editBtn, deleteBtn);
        cardContent.append(categoryTitle, categoryDescription, actionsBtns);
        categoryElement.append(cardContent);
        categoriesList.appendChild(categoryElement);
    });
}

addBtn.addEventListener('click', () => {
    modalCategory.classList.add('modal-overlay--show');
    
    categoryForm?.addEventListener('submit', async(event) => {

        event.preventDefault();

        const nameValue = categoryNameInput.value.trim();
        const descriptionValue = categoryDescriptionInput.value.trim();

        try{
            await CategoriaService.create(nameValue, descriptionValue);
            alert('Categoría creada con éxito.');

            categoryForm.reset();

            modalCategory.classList.remove('modal-overlay--show');

            const updateCategories = await CategoriaService.getAll();
            renderCategories(updateCategories);
        } catch(error){
            console.error("Error al crear la categoría desde el modal:", error);
            alert("Hubo un error al guardar la categoría. Revisá la consola.");
        }
    })
});


document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    categoriesList.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('category-card__btn--delete')) {
            const id = Number(target.dataset.id);
            if (confirm('¿Are you sure to delete this category?')) {
                CategoriaService.delete(id)
                    .then(() => loadCategories())
                    .catch(error => console.error('Failed to delete category:', error));
            }
        }
    });
});
