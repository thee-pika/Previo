
'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function PyqUploadForm() {
    const { accessToken, loading, user } = useAuth();
    const [form, setForm] = useState({
        title: "",
        year: "",
        subject: "",
        semester: "",
        course: [] as string[],
        file: null as File | null,
    });

    const courses = ["BCA", "BBA", "B.Sc", "B.Com", "BCZ", "B.A"];
    const semesters = [1, 2, 3, 4, 5, 6];
    const subjects = ["Maths", "Physics", "Medical Physics","Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer Science", "Accountancy", "Business Studies", "Economics", "History", "Geography", "Political Science", "Philosophy", "Psychology", "Sociology", "English Literature", "French", "Arabic", "Telugu", "Hindi", "English", "Maths", "Physics", "Chemistry", "Biology", "English", "Hindi", "Computer Science", "Accountancy", "Business Studies", "Economics", "History", "Geography", "Political Science", "Arabic", "Telugu", "Urdu"];

    const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

    const router = useRouter();
    console.log("user in form ", user);

    useEffect(() => {
        if (!user) {
            console.log("user not found", user);
            router.push("/login");
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log("e", e.target);
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSelectChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`${field} changed to`, e.target.value);
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (name === "file" && files) {
            setForm({ ...form, file: files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("form", form);
        const data = new FormData();
        data.append("title", form.title);
        data.append("year", form.year);
        data.append("semester", form.semester);
        data.append("subject", form.subject);
        data.append("course", JSON.stringify(form.course));


        if (form.file) data.append("fileUrl", form.file);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/paper`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.data.success) {
            toast.success("Paper uploaded successfully");
            router.push("/dashboard");
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } else {
            toast.error(response.data.message);
        }

    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Upload PYQ Paper</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Paper Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block font-semibold">Courses:</label>
                <div className="grid grid-cols-2 gap-2">
                    {courses.map(course => (
                        <label key={course} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={course}
                                checked={form.course.includes(course)}
                                onChange={(e) => {
                                    const newCourses = e.target.checked
                                        ? [...form.course, course]
                                        : form.course.filter(c => c !== course);
                                    setForm({ ...form, course: newCourses });
                                }}
                            />
                            {course}
                        </label>
                    ))}
                </div>

                <select
                    name="subject"
                    value={form.subject}
                    onChange={handleSelectChange("subject")}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                >
                        <option value="">Select Subject</option>
                    {
                        subjects.map((subject, index) => (
                            <option value={subject} key={index}>{subject}</option>
                        ))
                    }

                </select>
                <select
                    name="year"
                    value={form.year}
                    onChange={handleSelectChange("year")}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                >
                        <option value="">Select Year</option>
                    {
                        years.map((year, index) => (
                            <option value={year} key={index}>{year}</option>
                        ))
                    }
                </select>
                <select
                    name="semester"
                    value={form.semester}
                    onChange={handleSelectChange("semester")}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                >
                        <option value="">Select Semester</option>
                    {
                        semesters.map((semester, index) => (
                            <option value={semester} key={index}>Semester {semester}</option>
                        ))
                    }
                </select>
                <input
                    type="file"
                    name="file"
                    accept="application/pdf,image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Upload
                </button>
            </form>
            <Toaster />
        </div>
    );
}
