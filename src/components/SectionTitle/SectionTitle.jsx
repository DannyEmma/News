import './SectionTitle.css'

export default function SectionTitle({children}){
    return (
        <div className="section-title">
            <p>{children}</p>
        </div>
    )
}