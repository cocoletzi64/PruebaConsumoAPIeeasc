import React, { useState } from "react";

// --- Definiciones de Tipos (Interfaces) ---

// 1. Define la estructura de un solo Estudiante (lo que está dentro del array 'students')
interface StudentAPIResponse {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  groupId: number;
  groupName: string;
}

// 2. Define la estructura de un solo Field (lo que está dentro del array 'fields')
interface FieldAPIResponse {
  id: number;
  nombre: string;
  descripcion: string;
}

// 3. Define la estructura del objeto 'data' principal
interface MainDataAPIResponse {
  id: number;
  name: string;
  fileName: string;
  students: StudentAPIResponse[];
  fields: FieldAPIResponse[];
}

// 4. Define la estructura completa del DTO que devuelve tu endpoint /restTemplate/template
interface TemplateApiData {
  code: number;
  data: MainDataAPIResponse;
  success: boolean;
  message: string;
}

// Este tipo ya no es estrictamente necesario si solo visualizas.
// Lo mantenemos si en el futuro decides reintroducir formularios CRUD para otro endpoint.
interface NuevoStudentForm {
  id: number | null;
  name: string;
  lastName: string;
  secondLastName: string;
  groupId: number | null;
  groupName: string;
}

function Duenios() {
  const [datosTabla, setDatosTabla] = useState<StudentAPIResponse[]>([]);
  const [templateInfo, setTemplateInfo] = useState<MainDataAPIResponse | null>(null);
  const [apiMessage, setApiMessage] = useState<string>("");
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  const [busquedaId, setBusquedaId] = useState<string>("");
  const [editando, setEditando] = useState<boolean>(false);

  // **** VISUALIZACIÓN ****
  const estilos: { [key: string]: React.CSSProperties | { [key: string]: React.CSSProperties } } = {
    container: {
      maxWidth: "1000px",
      margin: "2rem auto",
      padding: "2.5rem",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.15)",
    },
    titulo: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "2rem",
      fontSize: "2rem",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1.05rem",
    },
    boton: {
      padding: "12px 25px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.05rem",
      marginBottom: "15px",
      marginRight: "10px",
      transition: "background-color 0.3s ease",
    },
    tabla: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#34495e",
      color: "white",
      padding: "15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      fontSize: "0.95rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #eee",
      textAlign: "left",
      fontSize: "0.9rem",
      color: "#333",
    },
    trOdd: {
      backgroundColor: "#f2f2f2",
    },
    trEven: {
      backgroundColor: "#ffffff",
    },
    infoContainer: {
        backgroundColor: "#e8f0f7",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        borderLeft: "5px solid #3498db",
    },
    infoParagraph: {
        margin: "5px 0",
        color: "#333",
        fontSize: "1rem",
    },
    tablaFields: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    thFields: {
      backgroundColor: "#5cb85c",
      color: "white",
      padding: "15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      fontSize: "0.95rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    tdFields: {
      padding: "12px",
      borderBottom: "1px solid #eee",
      textAlign: "left",
      fontSize: "0.9rem",
      color: "#333",
    }
  };

  const cargarDatosDelAPI = () => {
    if (!mostrarTabla) {
      fetch("http://localhost:9005/restTemplate/template")
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              return Promise.reject("Endpoint no encontrado o datos no disponibles.");
            }
            throw new Error(`Error del servidor: ${res.status}`);
          }
          return res.json() as Promise<TemplateApiData>;
        })
        .then((data) => {
          if (data && data.data) {
            if (Array.isArray(data.data.students)) {
              setDatosTabla(data.data.students);
            } else {
              console.warn("La propiedad 'data.students' no es un array.");
              setDatosTabla([]);
            }
            setTemplateInfo(data.data);
            setApiMessage(data.message || "");
          } else {
            console.warn("La estructura de la API no contiene la propiedad 'data' o es nula.");
            setDatosTabla([]);
            setTemplateInfo(null);
            setApiMessage("");
          }
        })
        .catch((err) => {
          console.error("Error al cargar datos del API:", err);
          alert(`Error al cargar datos: ${err}`);
          setDatosTabla([]);
          setTemplateInfo(null);
          setApiMessage("");
        });
    }
    setMostrarTabla(!mostrarTabla);
  };

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Visualización de Datos del Template y Estudiantes desde Spring Boot Backend</h1>

      <button onClick={cargarDatosDelAPI} style={estilos.boton}>
        {mostrarTabla ? "Ocultar Datos" : "Mostrar Datos del API"}
      </button>

      {mostrarTabla && (
        <>
          {/* Mostrar la información general del template */}
          {templateInfo && (
            <div style={estilos.infoContainer}>
              <h2 style={{marginTop: 0, color: "#3498db"}}>Información del Template</h2>
              <p style={estilos.infoParagraph}><strong>ID del Template:</strong> {templateInfo.id}</p>
              <p style={estilos.infoParagraph}><strong>Nombre del Template:</strong> {templateInfo.name}</p>
              <p style={estilos.infoParagraph}><strong>Nombre del Archivo:</strong> {templateInfo.fileName}</p>
              {apiMessage && <p style={estilos.infoParagraph}><strong>Mensaje del API:</strong> {apiMessage}</p>}
            </div>
          )}

          {datosTabla.length > 0 ? (
            <>
              <h2 style={{color: "#2c3e50", marginTop: "30px"}}>Lista de Estudiantes</h2>
              <table style={estilos.tabla}>
                <thead>
                  <tr>
                    <th style={{ ...estilos.th, width: "10%" }}>ID</th>
                    <th style={{ ...estilos.th, width: "18%" }}>Nombre</th>
                    <th style={{ ...estilos.th, width: "18%" }}>Apellido</th>
                    <th style={{ ...estilos.th, width: "18%" }}>Segundo Apellido</th>
                    <th style={{ ...estilos.th, width: "18%" }}>ID Grupo</th>
                    <th style={{ ...estilos.th, width: "18%" }}>Nombre del Grupo</th>
                    {/* La columna de Acciones se ha eliminado */}
                  </tr>
                </thead>
                <tbody>
                  {datosTabla.map((item) => (
                    <tr key={item.id} style={item.id % 2 === 0 ? estilos.trEven : estilos.trOdd}>
                      <td style={estilos.td}>{item.id}</td>
                      <td style={estilos.td}>{item.name}</td>
                      <td style={estilos.td}>{item.lastName}</td>
                      <td style={estilos.td}>{item.secondLastName}</td>
                      <td style={estilos.td}>{item.groupId}</td>
                      <td style={estilos.td}>{item.groupName}</td>
                      {/* Los botones de acción se han eliminado */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p style={{ textAlign: "center", color: "#555", marginTop: "20px" }}>No hay estudiantes disponibles en el API.</p>
          )}

          {/* Mostrar la tabla de 'fields' */}
          {templateInfo && templateInfo.fields && templateInfo.fields.length > 0 && (
            <>
              <h2 style={{color: "#2c3e50", marginTop: "50px"}}>Lista de Campos (Fields)</h2>
              <table style={estilos.tablaFields}>
                <thead>
                  <tr>
                    <th style={estilos.thFields}>ID Campo</th>
                    <th style={estilos.thFields}>Nombre Campo</th>
                    <th style={estilos.thFields}>Descripción Campo</th>
                  </tr>
                </thead>
                <tbody>
                  {templateInfo.fields.map((field) => (
                    <tr key={field.id} style={field.id % 2 === 0 ? estilos.trEven : estilos.trOdd}>
                      <td style={estilos.tdFields}>{field.id}</td>
                      <td style={estilos.tdFields}>{field.nombre}</td>
                      <td style={estilos.tdFields}>{field.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Duenios;
