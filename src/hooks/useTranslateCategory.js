export default function useTranslateCategory(lang, category){
    const translation = {
        eng: {
            divertissement: 'entertainment',
            entreprise: 'business',
            politique: 'politics',
            sante: 'health',
            science: 'science',
            sports: 'sports',
            technologie: 'technology'
        },
        fr: {
            entertainment: 'divertissement',
            business: 'entreprise',
            politics: 'politique',
            health: 'sante',
            science: 'science',
            sports: 'sports',
            technology: 'technologie'
        }
    }

    return translation[lang][category]
}