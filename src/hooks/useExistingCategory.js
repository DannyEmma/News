export default function useExistingCategory(category){
    const existingCategories = {
        divertissement: true,
        entreprise: true,
        politique: true,
        sante: true,
        science: true,
        sports: true,
        technologie: true
    }

    return existingCategories[category]
}