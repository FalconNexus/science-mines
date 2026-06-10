"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createCourse, updateCourse, deleteCourse } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";
import type { Course } from "@/types/database";

export function CoursesManager({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function openCreate() {
    setEditing(null);
    setFormKey((k) => k + 1);
    setShowForm(true);
  }

  function openEdit(course: Course) {
    setEditing(course);
    setFormKey((k) => k + 1);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (editing) {
        await updateCourse(editing.id, formData);
      } else {
        await createCourse(formData);
      }
      setShowForm(false);
      setEditing(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted text-sm">{courses.length} courses</p>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Add Course
        </Button>
      </div>

      {showForm && (
        <form
          key={formKey}
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-2xl border border-border bg-surface space-y-4"
        >
          <h3 className="font-semibold">
            {editing ? "Edit Course" : "New Course"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="title"
              label="Title"
              required
              defaultValue={editing?.title}
            />
            <Input
              name="duration"
              label="Duration"
              required
              defaultValue={editing?.duration}
              placeholder="e.g. 8 weeks"
            />
            <Input
              name="price"
              label="Price (INR)"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={editing?.price}
            />
          </div>
          <ImageUploadField
            bucket="course-images"
            defaultUrl={editing?.image_url}
            label="Course Image (upload)"
          />
          <Textarea
            name="description"
            label="Description"
            required
            defaultValue={editing?.description}
          />
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Course"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {courses.length === 0 && !showForm ? (
        <div className="text-center py-16 border border-border rounded-2xl">
          <p className="text-muted mb-2">No courses yet.</p>
          <p className="text-muted text-sm mb-4">
            Courses appear on the Booking page under &quot;Book a Course&quot;.
          </p>
          <Button size="sm" onClick={openCreate}>
            Add your first course
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <div className="relative aspect-video bg-black">
                {course.image_url ? (
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-1">{course.title}</h3>
                <p className="text-muted text-xs mb-3 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary font-bold">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-muted text-xs">{course.duration}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(course)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-border text-sm hover:border-primary/30 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border text-sm text-red-400 hover:border-red-400/30 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
