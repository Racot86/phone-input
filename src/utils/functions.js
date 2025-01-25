export const flags =()=>{
    const flagIcons = {}
    const data= import.meta.glob('../assets/flags/*.svg', { eager: true });

    for (const path in data) {
        const iconName = path.split('/').pop().replace(/\.\w+$/, ''); // Get filename without extension
        flagIcons[iconName.toUpperCase()] = data[path].default || data[path]; // Access the default export (file path)
    }
    return flagIcons;

}
