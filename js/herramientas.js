// REGISTRO CENTRAL DE HERRAMIENTAS
// Solo agregás herramientas acá, nunca tocás index.html ni otros archivos

const HERRAMIENTAS = [
    // ========== ESTUDIOS ==========
    {
        id: "cuadernos",
        nombre: "Cuadernos Digitales",
        descripcion: "Tomá notas organizadas por asignatura",
        categoria: "Estudios",
        icono: "📓",
        iconoCategoria: "📚",
        color: "#EFF6FF",
        tags: ["notas", "apuntes", "organizar"],
        url: "herramientas/estudios/cuadernos.html",
        roles: ["alumno", "profesor", "subadmin", "admin"],  // todos
        activo: true
    },
    {
        id: "checklist",
        nombre: "Checklist de Tareas",
        descripcion: "Pendientes, entregas y prioridades",
        categoria: "Estudios",
        icono: "✅",
        iconoCategoria: "📚",
        color: "#FEF3C7",
        tags: ["tareas", "pendientes", "organización"],
        url: "herramientas/estudios/checklist.html",
        roles: ["alumno", "profesor", "subadmin", "admin"],
        activo: true
    },
    {
        id: "calculadora",
        nombre: "Calculadora",
        descripcion: "Científica y básica para tus cálculos",
        categoria: "Estudios",
        icono: "🧮",
        iconoCategoria: "📚",
        color: "#EFF6FF",
        tags: ["matemática", "cálculos", "números"],
        url: "herramientas/estudios/calculadora.html",
        roles: ["alumno", "profesor", "subadmin", "admin"],
        activo: true
    },

    // ========== HERRAMIENTAS EXCLUSIVAS PARA PROFES ==========
    {
        id: "asistencia",
        nombre: "Registro de Asistencia",
        descripcion: "Control de asistencia por curso",
        categoria: "Docentes",
        icono: "📋",
        iconoCategoria: "👨‍🏫",
        color: "#FEF3C7",
        tags: ["asistencia", "profesores", "cursos"],
        url: "herramientas/docentes/asistencia.html",
        roles: ["profesor", "subadmin", "admin"],  // ALUMNOS NO LA VEN
        activo: false  // Próximamente
    },
    {
        id: "notas",
        nombre: "Libro de Notas",
        descripcion: "Registro de calificaciones por asignatura",
        categoria: "Docentes",
        icono: "📊",
        iconoCategoria: "👨‍🏫",
        color: "#EFF6FF",
        tags: ["notas", "evaluaciones", "calificaciones"],
        url: "herramientas/docentes/notas.html",
        roles: ["profesor", "subadmin", "admin"],
        activo: false
    },

    // ========== EJEMPLO DE CÓMO AGREGAR UNA NUEVA HERRAMIENTA ==========
    // {
    //     id: "nombre-unico",
    //     nombre: "Título que ve el usuario",
    //     descripcion: "Breve descripción de la herramienta",
    //     categoria: "NombreCategoria",  // Se crea sola si no existe
    //     icono: "🎯",                   // Emoji grande en la card
    //     iconoCategoria: "📁",          // Emoji en el sidebar
    //     color: "#EFF6FF",              // Color de fondo de la card
    //     tags: ["tag1", "tag2"],
    //     url: "herramientas/carpeta/archivo.html",
    //     roles: ["alumno", "profesor", "subadmin", "admin"],
    //     activo: true                   // false = "Próximamente"
    // }
];

// Función auxiliar para filtrar herramientas por rol (la usa index.html)
function filtrarHerramientasPorRol(rol) {
    return HERRAMIENTAS.filter(h => {
        if (!h.roles) return true;
        return h.roles.includes(rol);
    });
}
