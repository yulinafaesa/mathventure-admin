"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import MaterialList from "@/components/KelolaMateri/MaterialList";
import MaterialForm from "@/components/KelolaMateri/MaterialForm";
import DeleteConfirmModal from "@/components/KelolaMateri/DeleteConfirmModal";
import Toast from "@/components/Toast";
import { Material, INITIAL_MATERIALS } from "@/types/material";

type ViewState = "list" | "tambah" | "edit";

const STORAGE_KEY = "mathventure_materials_list";
const STORAGE_EVENT = "mathventure_storage_update";

function subscribe(callback: () => void) {
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEY) || "";
}

function getServerSnapshot(): string {
  return "";
}

function updateStorage(materials: Material[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("kelola-materi");
  const [view, setView] = useState<ViewState>("list");
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deletingMaterial, setDeletingMaterial] = useState<Material | null>(null);

  // Toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("Materi berhasil disimpan");

  // Read materials from external store (localStorage)
  const rawStorage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const materials = useMemo<Material[]>(() => {
    if (!rawStorage) return INITIAL_MATERIALS;
    try {
      const parsed = JSON.parse(rawStorage);
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MATERIALS;
  }, [rawStorage]);

  const showToast = (message = "Materi berhasil disimpan") => {
    setToastMessage(message);
    setToastOpen(true);
  };

  // Handlers
  const handleGoToAdd = () => {
    setEditingMaterial(null);
    setView("tambah");
  };

  const handleGoToEdit = (item: Material) => {
    setEditingMaterial(item);
    setView("edit");
  };

  const handleCancelForm = () => {
    setEditingMaterial(null);
    setView("list");
  };

  const handleSaveMaterial = (
    data: Omit<Material, "id">,
    existingId?: string
  ) => {
    if (existingId) {
      // Edit existing
      const updated = materials.map((item) =>
        item.id === existingId ? { ...item, ...data } : item
      );
      updateStorage(updated);
      showToast("Materi berhasil disimpan");
    } else {
      // Add new
      const newItem: Material = {
        id: Date.now().toString(),
        ...data,
      };
      updateStorage([newItem, ...materials]);
      showToast("Materi berhasil disimpan");
    }

    setEditingMaterial(null);
    setView("list");
  };

  const handleDeletePrompt = (item: Material) => {
    setDeletingMaterial(item);
  };

  const handleConfirmDelete = () => {
    if (!deletingMaterial) return;
    const updated = materials.filter((item) => item.id !== deletingMaterial.id);
    updateStorage(updated);
    setDeletingMaterial(null);
    showToast("Materi berhasil disimpan");
  };

  // Determine top navbar title
  const navbarTitle =
    view === "tambah"
      ? "Tambah Materi"
      : view === "edit"
      ? "Edit Materi"
      : "Kelola Materi";

  return (
    <div className="flex min-h-screen bg-[#F4F4F6] text-[#1D1B22] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeMenu={activeMenu}
        onSelectMenu={(menu) => {
          setActiveMenu(menu);
          if (menu === "kelola-materi") {
            setView("list");
          }
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar title={navbarTitle} />

        <main className="flex-1 overflow-y-auto">
          {activeMenu === "kelola-materi" ? (
            view === "list" ? (
              <MaterialList
                materials={materials}
                onAddClick={handleGoToAdd}
                onEditClick={handleGoToEdit}
                onDeleteClick={handleDeletePrompt}
              />
            ) : (
              <MaterialForm
                key={editingMaterial ? editingMaterial.id : "tambah"}
                initialData={editingMaterial}
                onSave={handleSaveMaterial}
                onCancel={handleCancelForm}
              />
            )
          ) : (
            <div className="p-8 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E3E2E8] rounded-[12px] p-8 text-center shadow-xs">
                <h3 className="text-[20px] font-bold text-[#1D1B22] capitalize">
                  {activeMenu.replace("-", " ")}
                </h3>
                <p className="text-[14px] text-[#6B6875] mt-2">
                  Halaman ini sedang dalam pengembangan. Silakan kembali ke menu{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("kelola-materi");
                      setView("list");
                    }}
                    className="text-[#B3245B] font-semibold underline cursor-pointer"
                  >
                    Kelola Materi
                  </button>
                  .
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        material={deletingMaterial}
        isOpen={Boolean(deletingMaterial)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingMaterial(null)}
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
