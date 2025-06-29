$(document).ready(function() {
    // Initialize
    let recipes = [];
    let editingRecipeId = null;
    let currentFilter = 'all';
    
    // Load recipes from localStorage
    loadRecipes();
    
    // Theme Management
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('body').attr('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    $('#theme-toggle').click(function() {
        const currentTheme = $('body').attr('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        $('body').attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = $('#theme-toggle i');
        if (theme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    }
    
    // Load recipes from localStorage
    function loadRecipes() {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
            recipes = JSON.parse(storedRecipes);
            displayRecipes();
        } else {
            $('#no-recipes').show();
        }
    }
    
    // Save recipes to localStorage
    function saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    
    // Display recipes
    function displayRecipes(recipesToDisplay = recipes) {
        const grid = $('#recipe-grid');
        grid.empty();
        
        if (recipesToDisplay.length === 0) {
            $('#no-recipes').show();
            return;
        }
        
        $('#no-recipes').hide();
        
        recipesToDisplay.forEach(recipe => {
            const card = createRecipeCard(recipe);
            grid.append(card);
        });
        
        // Bind edit and delete events after cards are created
        bindCardEvents();
    }
    
    // Create recipe card
    function createRecipeCard(recipe) {
        const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTc0YzNjO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2M0MmUyNDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        
        const ingredients = recipe.ingredients.split('\n').filter(i => i.trim());
        const snippet = ingredients.slice(0, 3).join(', ') + (ingredients.length > 3 ? '...' : '');
        
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <img src="${recipe.image || defaultImage}" alt="${recipe.name}" class="recipe-image">
                <div class="recipe-content">
                    <div class="recipe-header">
                        <h3 class="recipe-title">${recipe.name}</h3>
                        <div class="recipe-actions">
                            <button class="edit-btn" data-recipe-id="${recipe.id}"><i class="fas fa-edit"></i></button>
                            <button class="delete-btn" data-recipe-id="${recipe.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    ${recipe.category ? `<span class="recipe-category">${recipe.category}</span>` : ''}
                    <div class="recipe-meta">
                        ${recipe.prepTime ? `<span><i class="fas fa-clock"></i> ${recipe.prepTime} min</span>` : ''}
                        <span><i class="fas fa-utensils"></i> ${ingredients.length} ingredients</span>
                    </div>
                    <p class="recipe-snippet">${snippet}</p>
                </div>
            </div>
        `;
    }
    
    // Bind events to recipe cards
    function bindCardEvents() {
    // View recipe details
    $('#recipe-grid').off('click', '.recipe-card').on('click', '.recipe-card', function(e) {
        // Only trigger if the click is NOT on a button inside .recipe-actions
        if (
            $(e.target).closest('.edit-btn, .delete-btn').length === 0 &&
            $(e.target).closest('.recipe-actions').length === 0
        ) {
            const id = $(this).data('recipe-id');
            const recipe = recipes.find(r => r.id === id);
            if (recipe) {
                showRecipeDetails(recipe);
            }
        }
    });

    // Edit button
    $('#recipe-grid').off('click', '.edit-btn').on('click', '.edit-btn', function(e) {
        e.stopPropagation();
        const id = $(this).data('recipe-id');
        editRecipe(id);
    });

    // Delete button
    $('#recipe-grid').off('click', '.delete-btn').on('click', '.delete-btn', function(e) {
        e.stopPropagation();
        const id = $(this).data('recipe-id');
        deleteRecipe(id);
    });
}
    
    // Edit recipe function
    function editRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        
        editingRecipeId = id;
        $('#modal-title').text('Edit Recipe');
        $('#recipe-name').val(recipe.name);
        $('#recipe-category').val(recipe.category || '');
        $('#prep-time').val(recipe.prepTime || '');
        $('#recipe-ingredients').val(recipe.ingredients);
        $('#recipe-steps').val(recipe.steps);
        
        if (recipe.image) {
            $('#image-preview').html(`<img src="${recipe.image}" alt="Preview">`);
        } else {
            $('#image-preview').empty();
        }
        
        $('#recipe-modal').fadeIn();
    }
    
    // Delete recipe function
    function deleteRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        
        if (confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
            recipes = recipes.filter(r => r.id !== id);
            saveRecipes();
            displayRecipes(filterRecipes(recipes, currentFilter));
            showToast('Recipe deleted successfully!');
        }
    }
    
    // Add Recipe Modal
    $('#add-recipe-btn').click(function() {
        editingRecipeId = null;
        $('#modal-title').text('Add New Recipe');
        $('#recipe-form')[0].reset();
        $('#image-preview').empty();
        $('#recipe-modal').fadeIn();
    });
    
    // Close modals
    $('.close').click(function() {
        $(this).closest('.modal').fadeOut();
    });
    
    $('#cancel-btn').click(function() {
        $('#recipe-modal').fadeOut();
    });
    
    // Close modal on outside click
    $(window).click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $(e.target).fadeOut();
        }
    });
    
    // Image preview
    $('#recipe-image').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#image-preview').html(`<img src="${e.target.result}" alt="Preview">`);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    $('#recipe-form').submit(function(e) {
        e.preventDefault();
        
        const name = $('#recipe-name').val().trim();
        const category = $('#recipe-category').val();
        const prepTime = $('#prep-time').val();
        const ingredients = $('#recipe-ingredients').val().trim();
        const steps = $('#recipe-steps').val().trim();
        
        if (!name || !ingredients || !steps) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        const imageFile = $('#recipe-image')[0].files[0];
        
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                saveRecipe({
                    name,
                    category,
                    prepTime,
                    ingredients,
                    steps,
                    image: e.target.result
                });
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveRecipe({
                name,
                category,
                prepTime,
                ingredients,
                steps,
                image: editingRecipeId ? recipes.find(r => r.id === editingRecipeId).image : null
            });
        }
    });
    
    // Save recipe
    function saveRecipe(recipeData) {
        if (editingRecipeId) {
            const index = recipes.findIndex(r => r.id === editingRecipeId);
            recipes[index] = {
                ...recipes[index],
                ...recipeData,
                updatedAt: new Date().toISOString()
            };
            showToast('Recipe updated successfully!');
        } else {
            const newRecipe = {
                ...recipeData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            recipes.push(newRecipe);
            showToast('Recipe added successfully!');
        }
        
        saveRecipes();
        displayRecipes(filterRecipes(recipes, currentFilter));
        $('#recipe-modal').fadeOut();
        $('#recipe-form')[0].reset();
        $('#image-preview').empty();
    }
    
    // Show recipe details
    function showRecipeDetails(recipe) {
        const ingredientsList = recipe.ingredients.split('\n')
            .filter(i => i.trim())
            .map(i => `<li>${i.trim()}</li>`)
            .join('');
            
        const detailsHtml = `
            <div class="recipe-detail-header">
                <h2 class="recipe-detail-title">${recipe.name}</h2>
                <div class="recipe-detail-meta">
                    ${recipe.category ? `<span class="recipe-category">${recipe.category}</span>` : ''}
                    ${recipe.prepTime ? `<span><i class="fas fa-clock"></i> ${recipe.prepTime} minutes</span>` : ''}
                </div>
            </div>
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image">` : ''}
            
            <div class="recipe-detail-section">
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${ingredientsList}
                </ul>
            </div>
            
            <div class="recipe-detail-section">
                <h3>Preparation Steps</h3>
                <div class="steps-text">${recipe.steps}</div>
            </div>
        `;
        
        $('#recipe-details').html(detailsHtml);
        $('#view-recipe-modal').fadeIn();
    }
    
    // Search functionality
    $('#search-input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        if (searchTerm === '') {
            displayRecipes(filterRecipes(recipes, currentFilter));
            return;
        }
        
        const filteredRecipes = recipes.filter(recipe => {
            const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
            const ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchTerm);
            const categoryMatch = recipe.category && recipe.category.toLowerCase().includes(searchTerm);
            
            return nameMatch || ingredientsMatch || categoryMatch;
        });
        
        const finalFiltered = filterRecipes(filteredRecipes, currentFilter);
        
        if (finalFiltered.length === 0) {
            $('#recipe-grid').empty();
            $('#no-recipes').show().html(`
                <i class="fas fa-search"></i>
                <p>No recipes found matching "${searchTerm}"</p>
            `);
        } else {
            displayRecipes(finalFiltered);
        }
    });
    
    // Filter functionality
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        currentFilter = $(this).data('filter');
        const searchTerm = $('#search-input').val();
        
        if (searchTerm) {
            $('#search-input').trigger('input');
        } else {
            displayRecipes(filterRecipes(recipes, currentFilter));
        }
    });
    
    // Filter recipes by category
    function filterRecipes(recipesToFilter, filter) {
        if (filter === 'all') {
            return recipesToFilter;
        }
        
        return recipesToFilter.filter(recipe => recipe.category === filter);
    }
    
    function showToast(message, type = 'success') {
        const toast = $(`<div class="toast ${type === 'error' ? 'error' : ''}">${message}</div>`);
        $('body').append(toast);
        
        setTimeout(() => {
            toast.fadeOut(() => toast.remove());
        }, 3000);
    }
        if (recipes.length === 0 && !localStorage.getItem('demo-loaded')) {
        const sampleRecipes = [
            {
                id: '1',
                name: 'Classic Chocolate Chip Cookies',
                category: 'dessert',
                prepTime: 25,
                ingredients: '2 1/4 cups all-purpose flour\n1 tsp baking soda\n1 tsp salt\n1 cup butter',
                steps: '1. Preheat oven to 375°F\n2. Mix dry ingredients\n3. Cream butter and sugar\n4. Add eggs\n5. Bake for 10-12 minutes',
                createdAt: new Date().toISOString()
            }
        ];
        
        recipes = sampleRecipes;
        saveRecipes();
        displayRecipes();
        localStorage.setItem('demo-loaded', 'true');
    }
});
