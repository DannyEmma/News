function useConvertUTC(utcDateTime){
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    const date = new Date(utcDateTime)

    return {
        year: date.getUTCFullYear(),
        month: months[date.getUTCMonth()],
        date: date.getUTCDate().toString().length === 1 ? '0'+date.getUTCDate() : date.getUTCDate(),
        hour: date.getUTCHours().toString().length === 1 ? '0'+date.getUTCHours() : date.getUTCHours(),
        minutes: date.getUTCMinutes().toString().length === 1 ? '0'+date.getUTCMinutes() : date.getUTCMinutes(),
    }
}

export default useConvertUTC