import { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import { toast } from "react-toastify";

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

    const handleAddNew = () => {
        setNewBlog({ title: "", description: "", images: [] });
        setIsAdding(true);
        setEditingIndex(null);
    };

    const handleSaveNew = () => {
        if (!newBlog.title.trim() || !newBlog.description.trim()) {
            toast.warn("Please enter both title and description.");
            return;
        }
        if (editingIndex !== null) {
            const updatedBlogs = [...blogs];
            updatedBlogs[editingIndex] = newBlog;
            setBlogs(updatedBlogs);
        } else {
            setBlogs([...blogs, newBlog]);
        }
        resetForm();
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setNewBlog((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewBlog(blogs[index]);
        setIsAdding(true);
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            setBlogs(blogs.filter((_, i) => i !== index));
        }
    };

    const resetForm = () => {
        setNewBlog({ title: "", description: "", images: [] });
        setIsAdding(false);
        setEditingIndex(null);
    };

    return (
        <div className="h-full p-4 bg-[#FFF6F7]">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-[#1e3a5f] text-center">Blogs</h1>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded-lg font-bold"
                        onClick={handleAddNew}
                    >
                        Add New Blog
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <Card key={index} className="border border-black shadow-xl hover:scale-105 transition-transform duration-300 w-full rounded-lg overflow-hidden">
                            <CardBody className="p-4">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {blog.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt="blog"
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                                <CardTitle className="text-xl font-bold mt-3">{blog.title}</CardTitle>
                                <CardText className="text-gray-600">{blog.description}</CardText>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-[#242224] text-[#FFFFFF] px-3 py-1 rounded-md font-semibold"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-[#E21D27] text-[#FFFFFF] px-3 py-1 rounded-md font-semibold"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {isAdding && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                        <div className="relative p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                onClick={resetForm}
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-bold text-center">
                                {editingIndex !== null ? "Edit Blog" : "Add New Blog"}
                            </h2>

                            <label className="block mt-3">Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-black rounded"
                                value={newBlog.title}
                                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            />

                            <label className="block mt-3">Description</label>
                            <textarea
                                rows={3}
                                className="w-full p-2 border rounded border-black"
                                value={newBlog.description}
                                onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                            />

                            <label className="block mt-3">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                className="w-full p-2 border rounded border-black"
                                onChange={handleFileUpload}
                                accept="image/*"
                            />

                            <div className="flex flex-wrap mt-2 justify-center gap-2">
                                {newBlog.images.map((image, index) => (
                                    <div key={index} className="relative">
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
                                    className="bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded-lg"
                                    onClick={handleSaveNew}
                                >
                                    {editingIndex !== null ? "Save Changes" : "Save"}
                                </button>
                                <button
                                    className="bg-[#E21D27] text-[#FFFFFF] px-4 py-2 rounded-lg"
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
