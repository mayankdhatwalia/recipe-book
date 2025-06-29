# recipe-book
# 📖 Mayank's Recipe Book - Digital Cookbook Web App.

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com/)

A fully frontend Recipe Book web application that enables users to add, view, search, and manage recipes. All data, including images, is stored locally in the browser using localStorage with base64 encoding, ensuring complete privacy and offline functionality.

## ✨ Features

### Core Functionality
- 📝 **Add Recipes** - Create recipes with name, ingredients, preparation steps, and images
- 👁️ **View Recipes** - Display recipes in a beautiful grid layout with expandable details
- 🔍 **Search Recipes** - Real-time search by recipe name, ingredients, or category
- ✏️ **Edit Recipes** - Modify existing recipes with all their details
- 🗑️ **Delete Recipes** - Remove recipes with confirmation and undo option
- 🏷️ **Categories** - Organize recipes by categories (Vegan, Quick Meal, Dessert, etc.)
- ⏱️ **Prep Time** - Track preparation time for each recipe

### Advanced Features
- 🌓 **Dark/Light Theme** - Toggle between dark and light modes
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🖼️ **Image Storage** - Convert and store images in base64 format locally
- 💾 **Auto-save Drafts** - Automatically save recipe drafts while typing
- 📤 **Import/Export** - Backup and restore recipes in JSON format
- ⌨️ **Keyboard Shortcuts** - Quick actions (Ctrl+K for search, Ctrl+N for new recipe)
- 🔄 **Undo Delete** - Restore accidentally deleted recipes
- 🖨️ **Print Recipes** - Print-friendly recipe view

## 🚀 Demo

[Live Demo](#) <!-- Add your GitHub Pages link here -->

## 📸 Screenshots

### Home Page - Light Theme
![Recipe Book Home](https://via.placeholder.com/800x400/e74c3c/ffffff?text=Recipe+Book+Home+Page)

### Add Recipe Modal
![Add Recipe](https://via.placeholder.com/800x400/3498db/ffffff?text=Add+Recipe+Modal)

### Recipe Details View
![Recipe Details](https://via.placeholder.com/800x400/2ecc71/ffffff?text=Recipe+Details)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Application logic and functionality
- **jQuery 3.6.0** - DOM manipulation and event handling
- **localStorage API** - Client-side data persistence
- **Font Awesome 6.0** - Icons
- **Base64 Encoding** - Image storage in localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-book.git
   cd recipe-book
   ```

2. **No build process required!** Simply open the `index.html` file in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

3. **Or use a local server** (recommended for best experience):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

## 📋 Usage Guide

### Adding a Recipe
1. Click the **"+ Add New Recipe"** button
2. Fill in the recipe details:
   - Recipe name (required)
   - Category (optional)
   - Preparation time (optional)
   - Ingredients (required, one per line)
   - Preparation steps (required)
   - Upload an image (optional)
3. Click **"Save Recipe"**

### Searching Recipes
- Use the search bar to find recipes by name or ingredients
- Results update in real-time as you type
- Combine search with category filters for refined results

### Editing a Recipe
1. Click the **edit icon** (✏️) on any recipe card
2. Modify the details in the modal
3. Click **"Save Recipe"** to update

### Deleting a Recipe
1. Click the **delete icon** (🗑️) on any recipe card
2. Confirm the deletion
3. Use the **"Undo"** button in the notification to restore if needed

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus search bar
- `Ctrl/Cmd + N` - Add new recipe
- `Esc` - Close modals

## 📁 Project Structure

```
recipe-book/
│
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Application logic
├── README.md          # Documentation
└── LICENSE            # MIT License
```

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)
- ⚠️ Internet Explorer (not supported)

## 📊 localStorage Structure

The application stores data in localStorage with the following keys:

```javascript
{
  "recipes": [
    {
      "id": "unique-id",
      "name": "Recipe Name",
      "category": "category-slug",
      "prepTime": "30",
      "ingredients": "ingredient1\ningredient2\n...",
      "steps": "Step 1\nStep 2\n...",
      "image": "data:image/jpeg;base64,...",
      "createdAt": "ISO-date-string",
      "updatedAt": "ISO-date-string"
    }
  ],
  "theme": "light|dark",
  "recipe-draft": {...},
  "deletedRecipes": [...]
}
```

## 🔒 Privacy & Security

- **100% Client-side** - No server or backend required
- **No tracking** - Your recipes stay on your device
- **No cookies** - Only localStorage is used
- **No external dependencies** - All libraries are loaded from CDN

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Maintain the existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update README for new features
- Keep it frontend-only (no backend dependencies)

## 🎯 Future Enhancements

- [ ] Recipe sharing via URL
- [ ] Recipe ratings and reviews
- [ ] Nutritional information
- [ ] Shopping list generator
- [ ] Meal planning calendar
- [ ] Recipe collections/cookbooks
- [ ] Voice input for recipes
- [ ] OCR for recipe import from images
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support

## 🐛 Known Issues

- Large images may slow down the application due to base64 encoding
- localStorage has a ~5-10MB limit depending on the browser
- Some older browsers may not support all CSS features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- jQuery team for the excellent library
- Inspired by traditional recipe books and modern cooking apps
- Thanks to all contributors and users

## 📧 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/recipe-book](https://github.com/yourusername/recipe-book)

---

Made with ❤️ and JavaScript

[Back to top ↑](#-recipe-book---digital-cookbook-web-application)
