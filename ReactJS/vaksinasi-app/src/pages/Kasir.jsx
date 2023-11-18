import { Container } from "react-bootstrap";
import TableKategori from "./Tablekategori";
import { useEffect, useState } from "react";

const Kasir = () =>{
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/kategori")
        const result = await data.json()
        setData(result.data)
    }

    return<Container>
        <h1 className="text-center my-2">Kasir</h1>
        <TableKategori data={data}/>
    </Container>
}
export default Kasir;