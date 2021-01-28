
import styles from "./styles.module.css"


// export default function Spinner () {
//   return <div className={styles.loader}>Loading...</div>
// }

export default function Spinner () {
  return <span className={styles.spinner}></span>
}

// export default function Spinner () {
//   return <div className="lds-ring"><div></div><div></div><div></div><div>Cargando....</div></div>
// }