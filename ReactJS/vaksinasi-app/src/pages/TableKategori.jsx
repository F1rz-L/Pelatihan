const TableKategori = ({data}) => {
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kategori</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.kategori}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TableKategori;