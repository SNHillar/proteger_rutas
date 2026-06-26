import type { Product } from "../../../types/product";
import { productService } from "../../../services/productService";
import { ACTIONS_ICONS } from "../../../utils/icons";

const addBtn = document.getElementById("add-product") as HTMLButtonElement;
const productsGrid = document.getElementById("gridProducts") as HTMLDivElement;
const productsModal = document.getElementById('productModal') as HTMLDivElement;
const productForm = document.getElementById('productForm') as HTMLFormElement;
const productNameInput = document.getElementById('productName') as HTMLInputElement;
const productPriceInput = document.getElementById('productPrice') as HTMLInputElement;
const productDescriptionInput = document.getElementById('productDescription') as HTMLTextAreaElement;
const productStockInput = document.getElementById('productStock') as HTMLInputElement;
const productImageInput = document.getElementById('productImage') as HTMLInputElement;
const productCategoryInput = document.getElementById('productCategory') as HTMLInputElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;

let products: Product[] = [];
let editingProductId: number | null = null;

async function loadProducts() {
    try {
        products = await productService.getAll();
        renderProducts(products);
    } catch (error) {
        console.log("Error al cargar los prodcutos.", error)
        return;
    }
}

function renderProducts(products: Product[]) {

    if (!products) return;
    console.log("Productos que llegaron al render:", products);
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const managementCard = document.createElement('article') as HTMLDivElement;
        managementCard.classList.add('management-card');

        const cardMedia = document.createElement('div') as HTMLDivElement;
        cardMedia.classList.add('management-card__media');

        const cardContent = document.createElement('div') as HTMLDivElement;
        cardContent.classList.add('management-card__content');

        const actionsBtns = document.createElement('div') as HTMLDivElement;
        actionsBtns.classList.add('management-card__actions');

        const productImage = document.createElement('img') as HTMLImageElement;
        productImage.classList.add('management-card__img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const stockProduct = document.createElement('span') as HTMLSpanElement;
        stockProduct.classList.add('management-card__badge');
        stockProduct.textContent = `Stock: ${product.stock}`;

        const productTitle = document.createElement('h3') as HTMLHeadingElement;
        productTitle.classList.add('management-card__name')
        productTitle.textContent = `${product.name}`;

        const productDescription = document.createElement('p') as HTMLParagraphElement;
        productDescription.classList.add('management-card__description')
        productDescription.textContent = product.description;

        const productCategory = document.createElement('p') as HTMLParagraphElement;
        productCategory.classList.add('management-card__category')
        console.log(product);
        productCategory.textContent = product.categoryDto.name;

        const productPrice = document.createElement('p') as HTMLParagraphElement;
        productPrice.classList.add('management-card__price')
        productPrice.textContent = `$ ${product.price}`;

        const editBtn = document.createElement('button') as HTMLButtonElement;
        editBtn.classList.add('btn-icon-action', 'btn-icon-action--edit')
        editBtn.dataset.id = `${product.id}`;
        editBtn.title = 'Editar';
        editBtn.innerHTML = `${ACTIONS_ICONS['Edit']}<span>Editar</span>`

        const deleteBtn = document.createElement('button') as HTMLButtonElement;
        deleteBtn.classList.add('btn-icon-action', 'btn-icon-action--delete')
        deleteBtn.dataset.id = `${product.id}`;
        deleteBtn.title = 'Eliminar';
        deleteBtn.innerHTML = `${ACTIONS_ICONS['Delete']}<span>Eliminar</span>`;

        if (product.deleted) {
            managementCard.classList.add('management-card--deleted')

            editBtn.disabled = true;
            deleteBtn.disabled = true;
            deleteBtn.textContent = "Ya eliminado."

            const badgeDeleted = document.createElement('span') as HTMLSpanElement;
            badgeDeleted.textContent = 'ELIMINADO';
            badgeDeleted.classList.add('badge-deleted')

            managementCard.appendChild(badgeDeleted);

        }

        // metemos los botones dentro del div de actions
        actionsBtns.append(editBtn, deleteBtn);
        // metemos imagen y el badge del stock dentro del div de media
        cardMedia.append(productImage, stockProduct);
        // metemos titulo, descripcion, etc dentro del content div
        cardContent.append(productTitle, productDescription, productCategory, productPrice, actionsBtns);
        // metemos todo dentro del article
        managementCard.append(cardMedia, cardContent);
        // agregamos los articulos al grid
        productsGrid.appendChild(managementCard);
    });
}


addBtn.addEventListener('click', () => {
    editingProductId = null;
    productForm.reset();
    productsModal.classList.add('modal-overlay--show');
});

productForm?.addEventListener('submit', async (event: SubmitEvent) => {

    event.preventDefault();

    const nameValue: string = productNameInput.value.trim();
    const priceValue: number = productPriceInput.valueAsNumber;
    const descriptionValue: string = productDescriptionInput.value.trim();
    const stockValue: number = productStockInput.valueAsNumber;
    const imageValue: string = productImageInput.value.trim();
    const categoryValue: number = productCategoryInput.valueAsNumber;

    try {
        if (!editingProductId) {
            await productService.create(nameValue, priceValue, descriptionValue, stockValue, imageValue, categoryValue);
            alert('Producto creado con éxito.'); // TODO: Modal.
        } else {
            await productService.update(editingProductId, nameValue, priceValue, descriptionValue, stockValue, imageValue, categoryValue)
        }
        productForm.reset();
        editingProductId = null;
        productsModal.classList.remove('modal-overlay--show');
        const updateProducts = await productService.getAll();
        renderProducts(updateProducts);

    } catch (error) {
        console.error("Error al crear el producto desde el modal:", error);
        alert("Hubo un error al guardar la categoría. Revisá la consola."); // TODO: Modal.
    }
});

closeModalBtn?.addEventListener('click', () => {

    productsModal.classList.remove('modal-overlay--show');
    productForm.reset();
    if (typeof editingProductId !== 'undefined') {
        editingProductId = null;
    }
});

document.addEventListener('DOMContentLoaded', () => {

    loadProducts();

    productsGrid.addEventListener('click', (e: PointerEvent) => {
        const target = e.target as HTMLButtonElement;

        const isEdit = target.closest('.btn-icon-action--edit') as HTMLButtonElement;
        const isDelete = target.closest('.btn-icon-action--delete') as HTMLButtonElement;

        if (isDelete) {
            const id = Number(isDelete.dataset.id);
            if (confirm('¿Are you sure to delete this product?')) {
                productService.delete(id)
                    .then(() => loadProducts())
                    .catch(error => console.error('Failed to delete product:', error));
            }
        }

        if (isEdit) {
            const id = Number(isEdit.dataset.id)
            const productToEdit = products.find(p => p.id === id);

            if (productToEdit) {
                productNameInput.value = productToEdit.name;
                productPriceInput.value = productToEdit.price.toString();
                productDescriptionInput.value = productToEdit.description;
                productStockInput.value = productToEdit.stock.toString();
                productImageInput.value = productToEdit.image;
                if (productToEdit.categoryDto) {
                    productCategoryInput.value = productToEdit.categoryDto.id.toString();
                };
                editingProductId = id;
                productsModal.classList.add('modal-overlay--show');

            }
        }
    });
});


