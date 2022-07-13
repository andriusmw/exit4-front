
import { Entry } from "./Entry";

export const EntriesList = ({entries, removeEntry}) => {
    return entries.length ? (
    <ul className="ulEntryList">
        {entries.map((entry) => (
        <li key={entry.id}>
            <Entry entry={entry} removeEntry={removeEntry} /> 
        </li>
        ))}
    </ul>
    ) :( 
    <p>No hay entradas disponibles...</p>
    );

};