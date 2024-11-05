import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    titulo: '',
    descripcion: '',
    completada: false,
    fecha_vencimiento: '',
    prioridad: 'media',
    asignado_a: '',
    categoria: '',
    Costo_proyecto: 0, // Debe ser un número
    Pagado: false, // Debe ser un booleano
  });

  const apiUrl = 'https://examen-backend-932770499416.us-central1.run.app/api/proyectos'; // Cambia esto a tu URL de API

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get(apiUrl);
    setProjects(response.data.proyectos);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí se envían los valores directamente del formulario
    await axios.post(apiUrl, project);
    fetchProjects();
    // Reiniciar el formulario
    setProject({
      titulo: '',
      descripcion: '',
      completada: false,
      fecha_vencimiento: '',
      prioridad: 'media',
      asignado_a: '',
      categoria: '',
      Costo_proyecto: 0,
      Pagado: false,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h1>Project Management (ToDo App)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={project.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={project.descripcion}
          onChange={handleChange}
        ></textarea>
        <input
          type="date"
          name="fecha_vencimiento"
          value={project.fecha_vencimiento}
          onChange={handleChange}
        />
        <select name="prioridad" value={project.prioridad} onChange={handleChange}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="text"
          name="asignado_a"
          placeholder="Asignado a"
          value={project.asignado_a}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={project.categoria}
          onChange={handleChange}
        />
        <input
          type="number"
          name="Costo_proyecto"
          placeholder="Costo del Proyecto"
          value={project.Costo_proyecto}
          onChange={handleChange}
          required
        />
          <button type="pagado">stripe</button>
          <button type="submit">Agregar Proyecto</button>
      </form>

      <h2>Lista de Proyectos</h2>
      <ul>
        {projects.map((proj) => (
          <li key={proj.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <strong>{proj.titulo}</strong> - {proj.descripcion} <br />
            <em>Prioridad: {proj.prioridad}</em> <br />
            <em>Fecha de Vencimiento: {proj.fecha_vencimiento}</em> <br />
            {/* <em>Costo: ${proj.Costo_proyecto}</em> <br /> */}
            <em>Categoría: {proj.categoria}</em> <br />
            <em>Asignado a: {proj.asignado_a}</em> <br />
            {/* <em style={{ color: proj.Pagado ? 'green' : 'red' }}> */}
              {/* {proj.Pagado ? 'Status: Pagado' : 'Status: No Pagado'} */}
            {/* </em> */}
            <br />
            <button onClick={() => handleDelete(proj.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
