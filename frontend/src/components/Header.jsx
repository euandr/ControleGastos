
export default function Header(props) {
    return (
        <header>
            <div className="header-content">
            <h1>{props.title}</h1>
            <p>{props.resumo}</p>
            </div>
            <button>{props.textButton}</button>
        </header>
    );
}