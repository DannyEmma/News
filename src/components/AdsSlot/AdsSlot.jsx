import './AdsSlot.css'

/**
 *  This components is a placeholder of Ads
 *
 * @export
 * @param {string} {variant} square | rectangle
 * @return {React.Element}
 */
export default function AdsSlot({variant, mTop = 0, mBottom = 0}){
    return (
        <div className={`ads-slot ads-slot-${variant}`} style={{marginTop: mTop, marginBottom: mBottom}}>
            <p>Ads</p>
        </div>
    )
}