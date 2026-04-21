
/**
 *  This hook change dynamically the title of the document html
 *
 * @export
 * @param {string} title
 */
export default function useDocumentTitle(title){
    if(document.title !== title) document.title = title
}