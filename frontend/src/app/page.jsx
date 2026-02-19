"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/users.service";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔹 Cargar usuarios
  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔹 Crear usuario
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Completa todos los campos");
      return;
    }

    await createUser({ name, email });
    setName("");
    setEmail("");
    loadUsers();
  };

  // 🔹 Preparar edición
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // 🔹 Actualizar usuario
  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateUser(editingId, { name, email });
    setEditingId(null);
    setName("");
    setEmail("");
    loadUsers();
  };

  // 🔹 Eliminar usuario
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    await deleteUser(id);
    loadUsers();
  };

  return (
    <main style={{ padding: "30px", color: "white" }}>
      <h1>Usuarios</h1>

      {/* 📌 FORMULARIO */}
      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        style={{ marginBottom: "20px" }}
      >
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Actualizar" : "Crear"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* 📌 TABLA */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
