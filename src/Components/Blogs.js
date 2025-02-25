import { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "react-bootstrap";

const Blogs = () => {
    const [blogs, setBlogs] = useState([
        {
            title: "Home Loan Benefits",
            description: "Learn about the advantages of home loans and how they can help you achieve your dream home.",
            images: ["/images/home loan.webp", "/images/home loan1.jpg"]
        },
        {
            title: "Car Loan Process",
            description: "Understand the step-by-step process to apply for a car loan easily and efficiently.",
            images: ["/images/car loan.jpg"]
        },
        {
            title: "Business Loan Essentials",
            description: "Discover what you need to apply for a business loan and grow your business successfully.",
            images: ["/images/business loan.jpg", "/images/business loan1.jpg"]
        }
    ]);

    const [newBlog, setNewBlog] = useState({ title: "", description: "", images: [] });
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // Handle adding new blog
    const handleAddNew = () => {
        setNewBlog({ title: "", description: "", images: [] });
        setIsAdding(true);
        setEditingIndex(null);
    };

    // Handle saving new blog
    const handleSaveNew = () => {
        if (!newBlog.title.trim() || !newBlog.description.trim()) {
            alert("Please enter both title and description.");
            return;
        }
        if (editingIndex !== null) {
            // Editing an existing blog
            const updatedBlogs = [...blogs];
            updatedBlogs[editingIndex] = newBlog;
            setBlogs(updatedBlogs);
        } else {
            // Adding a new blog
            setBlogs([...blogs, newBlog]);
        }
        resetForm();
    };
    
    // Handle file upload (Image preview)
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setNewBlog((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
    };

    // Handle editing an existing blog
    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewBlog(blogs[index]);
        setIsAdding(true);
    };

    // Handle deleting a blog
    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            setBlogs(blogs.filter((_, i) => i !== index));
        }
    };

    // Reset form fields
    const resetForm = () => {
        setNewBlog({ title: "", description: "", images: [] });
        setIsAdding(false);
        setEditingIndex(null);
    };

    return (
        <div className="mt-4 min-h-screen">
            <div className="mx-auto p-2 relative">
                <h1 className="text-3xl font-bold text-[#1e3a5f]">Blogs</h1>
                <button
                    className="mt-3 bg-[#1cbdc1] text-white px-4 py-2 rounded-lg font-bold"
                    onClick={handleAddNew}
                >
                    Add New Blog
                </button>

                <div className="mt-5 flex flex-wrap">
                    {blogs.map((blog, index) => (
                        <Card key={index} className="w-80 m-3 p-3 shadow-lg rounded-lg">
                            <CardBody>
                                <div className="flex flex-wrap justify-center">
                                    {blog.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt="blog"
                                            className="w-24 h-24 object-cover m-2.5 rounded-md"
                                        />

                                    ))}
                                </div>
                                <CardTitle className="text-xl font-bold mt-3">{blog.title}</CardTitle>
                                <CardText>{blog.description}</CardText>
                                <button
                                    className="mt-2 bg-[#1cbdc1] text-white px-3 py-1 rounded-md cursor-pointer mr-6 font-semibold"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer font-semibold"
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </button>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {isAdding && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="p-6 bg-white rounded-lg shadow-lg w-96 relative">
                            <h2 className="text-xl font-bold text-center">
                                {editingIndex !== null ? "Edit Blog" : "Add New Blog"}
                            </h2>

                            <label className="block mt-3">Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={newBlog.title}
                                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            />

                            <label className="block mt-3">Description</label>
                            <textarea
                                rows={3}
                                className="w-full p-2 border rounded"
                                value={newBlog.description}
                                onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                            />

                            <label className="block mt-3">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                className="w-full p-2 border rounded"
                                onChange={handleFileUpload}
                                accept="image/*"
                            />


                            <div className="flex flex-wrap mt-2 justify-center">
                                {newBlog.images.map((image, index) => (
                                    <div key={index} className="relative m-1">
                                        <img
                                            src={image}
                                            alt="Blog-Image"
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>


                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-[#1cbdc1] text-white px-4 py-2 rounded-lg"
                                    onClick={handleSaveNew}
                                >
                                    {editingIndex !== null ? "Save Changes" : "Save"}
                                </button>
                                <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
