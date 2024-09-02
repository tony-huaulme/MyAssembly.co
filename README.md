# Vue.js App Template with PrimeVue and Tailwind CSS

This is a quick-start template for building Vue.js applications with [PrimeVue](https://www.primefaces.org/primevue/) and [Tailwind CSS](https://tailwindcss.com/). The template is designed to help you set up a new project quickly with a pre-configured environment, including a basic example of how to use PrimeVue components and Tailwind for styling.

## 🚀 Getting Started

### 1. Clone the Repository

To get started, clone the repository:

```sh
git clone https://github.com/tony-huaulme/VueJsPrimeVueTailwind.git
cd VueJsPrimeVueTailwind

```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```sh
npm install
```

### 3. Run the Development Server

Start the development server using the following command:

```sh
npm run dev
```

The app should now be running at `http://localhost:5173` ( VueJs default port ).

### 4. Build for Production

To build the app for production, use the following command:

```sh
npm run build
```

The production build files will be located in the `dist` directory.

## 📝 Usage

### PrimeVue Components

PrimeVue is a powerful UI component library for Vue.js that offers a variety of components such as buttons, data tables, forms, and more. To use PrimeVue components in your app, follow these steps:

1. Import the components you want to use in your Vue files. For example:

    ```js
    import { Button } from 'primevue/button';
    ```

2. Register the components globally or locally within your components:

    ```js
    components: {
        Button
    }
    ```

3. Use the component in your template:

    ```html
    <Button label="Click Me" />
    ```

4. Add the PrimeVue and Tailwind CSS styles to your `main.js`:

    ```js
    import 'primevue/resources/themes/saga-blue/theme.css';  // Choose a PrimeVue theme
    import 'primevue/resources/primevue.min.css';
    import 'primeicons/primeicons.css';
    import './assets/tailwind.css';  // Import Tailwind CSS
    ```

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to create modern, responsive designs quickly. You can use Tailwind classes directly in your templates. For example:

```html
<div class="flex items-center justify-center h-screen">
  <h1 class="text-4xl font-bold text-blue-500">Hello, Vue.js with Tailwind CSS!</h1>
</div>
```

## 📚 Documentation and Useful Resources

- **PrimeVue Documentation:** [PrimeVue Docs](https://www.primefaces.org/primevue/showcase/)
- **Tailwind CSS Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)
- **Vue.js Documentation:** [Vue.js Docs](https://vuejs.org/guide/)

## 🛠 Recommended Tools

- [Vue DevTools](https://devtools.vuejs.org/): A browser extension for debugging Vue.js applications.
- [VSCode](https://code.visualstudio.com/): A popular code editor with great extensions for Vue.js, Tailwind CSS, and more.

## 🎉 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/your-username/your-repo-name/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

For any questions or suggestions, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Happy coding! 🎉
