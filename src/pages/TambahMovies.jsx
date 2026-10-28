import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/MoviesServices";

function TambahMovies (){
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        title : '',
        year : ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const payload ={
                ...form,
                year: form.year ? parseInt(form.year, 10) : null
            };

            console.log('Data yang dikirim : ', payload);
            await createMovie(payload);
            alert('Data berhasil ditambahkan');
            navigate('/movies');
        } catch (error) {
            console.log("Detail error :", error.response?.data);
            alert('Gagal menambahkan data');
        }
    }
    return(
        <section className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h3 className="fw-bold mb4">
                                    Tambah Movies
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor=""
                                        className="form-label">
                                            Title
                                        </label>
                                        <input
                                        onChange={handleChange}
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        className="form-control"
                                        placeholder="Masukkan Tittle" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor=""
                                        className="form-label">
                                            Tahun
                                        </label>
                                        <textarea
                                            type="number"
                                            onChange={handleChange}
                                            name="year"
                                            value={form.year}
                                            className="form-control"
                                            placeholder="Tuliskan Tahun" required>
                                        </textarea>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary">
                                            <i className="bi bi-save me-2">
                                            </i>
                                            Simpan
                                        </button>
                                        <button
                                            onClick={() => navigate('/movies')}
                                            className="btn btn-secondary">
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>       
    )
}
export default TambahMovies;