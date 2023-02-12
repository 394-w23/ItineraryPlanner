import { useDbData } from "../../utilities/firebase";

export default function NavbarApp() {
    const [data, error] = useDbData();
    if (data !== undefined) {
        console.log("database", data);
    }

    return (
        <>
        <h1>Hello there!!!</h1>
        </>
    )
}