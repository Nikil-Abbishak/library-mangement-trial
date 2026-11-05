import { useState } from 'react'
import { addNewBook } from '../../services/bookService'
import './addBook.css'

export function AddBook() {


    const initialFormState = {
        isbn: '',
        title: '',
        author: '',
        type_id: null,
        status: '',
        language: '',
        cover_image_url: ''
    }

    const [values, setValues] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

    function handleInput(event) {

        setValues({
            ...values, [event.target.name]: event.target.name === 'type_id' ? Number(event.target.value) : event.target.value
        })

    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('raw ', values)
        setLoading(true)

        try {
            const data = await addNewBook(values)
            console.log('sent ', data)

            // setValues(initialFormState)
            setStatusMessage('Book Added.')
        } catch (err) {
            setStatusMessage('Failed to send')
            console.error('Submission failed:', err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="add-book-container">
            <div className="add-book-header">
                <h2>Add New Book</h2>
                <p>Enter the details below to register a new book in the library collection.</p>
            </div>
            <div className={statusMessage ? statusMessage === 'Book Added.' ? 'alert alert-success' : 'alert alert-error' : 'alert'} >{statusMessage}</div>
            <form className="add-book-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">
                            Title <span className="required-star">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="e.g. Movie Name"
                            required
                            onChange={handleInput}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="author">
                            Author <span className="required-star">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="author"
                            name="author"
                            placeholder="e.g. Robert C. Martin"
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="isbn">
                            ISBN <span className="required-star">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="isbn"
                            name="isbn"
                            placeholder="e.g. 9780132350884"
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="type_id">
                            Book Type ID / Category <span className="required-star">*</span>
                        </label>
                        <select
                            className="form-input"
                            id="type_id"
                            name="type_id"
                            onChange={handleInput}
                            required
                        >
                            <option value=''>Select</option>
                            <option value='1'>Fiction</option>
                            <option value='2'>Science</option>
                            <option value='3'>History</option>
                            <option value='4'>Technology</option>
                            <option value='5'>Education</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="status">
                            Status <span className="required-star">*</span>
                        </label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            onChange={handleInput}
                            required

                        >
                            <option value="">Select</option>
                            <option value="Available">Available</option>
                            <option value="Borrowed">Borrowed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="language">
                            Language <span className="required-star">*</span>
                        </label>
                        <select
                            className="form-select"
                            id="language"
                            name="language"
                            onChange={handleInput}
                            required
                        >
                            <option value="">Select</option>
                            <option value="English">English</option>
                            <option value="Sinhala">Sinhala</option>
                            <option value="Tamil">Tamil</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label" htmlFor="cover_image_url">
                            Cover Image URL
                        </label>
                        <input
                            className="form-input"
                            type="url"
                            id="cover_image_url"
                            name="cover_image_url"
                            placeholder="https://example.com/cover.jpg"
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-reset-form"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-submit-book"
                    >
                        {loading ? 'Sending' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}
