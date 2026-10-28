import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getAllMovies, deleteMovie } from "../services/MoviesServices";
import { Link } from "react-router-dom";

function Movies(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const loadData = async() =>{
        try{
        setLoading(true);
        setError('');
        const response = await getAllMovies();
        console.log(response.data);
        setData(response.data);
    }catch(error){
        console.log(error);
        setError(
            'Gagal mengambil data movie'
        );
    }finally{
        setLoading(false);
    }
  }
  useEffect(()=>{
    loadData();
  }, [])
  if(loading){
    return<Loading/>
  }
    const handleDelete = async (id) => {
    const konfirmasi = window.confirm(
        'Apakah anda bersedia untuk menghapus data yang anda pilih ini?'
    );
    if(!konfirmasi) {
        return;
    }
    try{
        await deleteMovie(id);
        alert('Data berhasil dihapus!')
        loadData();
    }catch (error) {
        console.error(error);
        alert('Gagal menghapus data')
    }
  }

  return(
        <section>
        <Link to="/movie/tambah"
        className="btn btn-primary">
            Tambah Movie
        </Link>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>NO</th>
                                    <th>TITLE</th>
                                    <th>YEAR</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data || []).map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{index+1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.year}</td>
                                        <td> 
                                        <Link to={`/movie/${item.id}`}
                                        className="btn btn-sm btn-outline-primary"
                                        title="Detail">
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                        <Link to={`/movie/edit/${item.id}`}
                                        className="btn btn-sm btn-outline-warning"
                                        title="Edit">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-outline-danger"
                                        title="Hapus">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Movies;