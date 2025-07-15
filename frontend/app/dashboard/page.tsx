'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Download, X } from 'lucide-react';
import Link from 'next/link';

interface Paper {
  _id: string;
  title: string;
  subject: string;
  course: string[];
  year: string;
  fileUrl: string;
};

const DashboardPage = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/paper`);
    const allPapers: Paper[] = response.data.papers;
    setPapers(allPapers);

    const uniqueCourses = new Set<string>();
    allPapers.forEach(p => p.course.forEach(c => uniqueCourses.add(c)));
    setCourses(Array.from(uniqueCourses));
  }

  useEffect(() => {
    if (selectedCourse) {
      const relatedSubjects = new Set<string>();
      papers.forEach(paper => {
        if (paper.course.includes(selectedCourse)) {
          relatedSubjects.add(paper.subject);
        }
      });
      setSubjects(Array.from(relatedSubjects));
      setSelectedSubject("");
      setFilteredPapers([]);
    }
  }, [selectedCourse, papers]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading,router])


  useEffect(() => {
    if (selectedCourse && selectedSubject) {
      const filtered = papers.filter(paper =>
        paper.course.includes(selectedCourse) &&
        paper.subject === selectedSubject
      );
      setFilteredPapers(filtered);
    }
  }, [selectedSubject, papers, selectedCourse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        toast.error("Failed to fetch the file.");
        return;
      }

      const blob = await response.blob();
      const contentType = response.headers.get("content-type");
      const extension = contentType?.includes("pdf") ? ".pdf" : '';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      toast.success(`File downloaded successfully`);
    } catch (error) {
      console.log("error", error);
      toast.error("Error downloading file.");
    }
  };

  return (
    <div className="relative">
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>
            <Image src={previewUrl} alt="Preview" className="max-h-[80vh] max-w-[90vw]" width={1000} height={1000} />
          </div>
        </div>
      )}

      <div className={`${previewUrl ? 'blur-sm pointer-events-none' : ''} max-w-4xl mx-auto p-6`}>
        <h1 className="text-3xl font-bold mb-6">Browse Previous Year Papers</h1>

        <div className="mb-4">
          <label className="font-medium block mb-1">Select Course:</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="mb-4">
            <label className="font-medium block mb-1">Select Subject:</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">-- Select Subject --</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}

        {filteredPapers.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Available Papers:</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {filteredPapers.map(paper => (
                <div
                  key={paper._id}
                  className="border border-gray-300 rounded-lg p-4 shadow bg-white space-y-3 flex flex-col justify-evenly"
                >
                  <h3 className="text-lg font-bold">{paper.title}</h3>
                  <p className="text-sm text-gray-600">Subject: {paper.subject}</p>
                  <p className="text-sm text-gray-600">Course: {paper.course.join(", ")}</p>
                  <p className="text-sm text-gray-600">Year: {paper.year}</p>

                  <Image
                    src={paper.fileUrl}
                    alt={paper.title}
                    width={1000}
                    height={1000}
                    className="w-full max-h-64 object-contain border rounded"
                  />
                  <div className='bg-gradient-primary hover:opacity-90flex justify-center items-center'>
                    <Link
                      href={paper.fileUrl}
                      download
                      className=" mt-2  text-white px-4 py-1 rounded text-sm"
                    >
                      <span className='flex items-center justify-center'>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardPage;
