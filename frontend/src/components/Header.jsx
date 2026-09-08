
import { useState } from "react";
import NewExpenseModal from "./NewExpenseModal"
export default function Header(props) {

    const [modalAberto, setModalAberto]=useState(false);

    return (
      <>
        <header>
          <div className="header-content">
            <h1>{props.title}</h1>
            <p>{props.resumo}</p>
          </div>
          <button id="novo-gasto" onClick={() => setModalAberto(true)}>
            {props.textButton}
          </button>
        </header>
        {modalAberto && (
          <NewExpenseModal onClose={() => setModalAberto(false)} />
        )}
      </>
    );
}